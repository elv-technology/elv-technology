import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { CONTACT_CONFIG } from '@/lib/contact-config';
import { prisma } from '@/lib/prisma';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { escapeHtml, toHeaderSafe } from '@/lib/escape-html';

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const applicationSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(5).max(30),
  position: z.string().trim().min(1).max(150),
  otherPosition: z.string().trim().max(150).optional(),
  message: z.string().trim().max(5000).optional(),
  // Honeypot: hidden from people, bots tend to fill it in.
  website: z.string().max(0).optional(),
});

/** Checks the file's real type from its first bytes, not just its name. */
function detectDocumentType(bytes: Buffer): 'pdf' | 'docx' | 'doc' | null {
  if (bytes.subarray(0, 4).toString('latin1') === '%PDF') return 'pdf';
  if (bytes[0] === 0x50 && bytes[1] === 0x4b && bytes[2] === 0x03 && bytes[3] === 0x04) return 'docx';
  if (bytes.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]))) return 'doc';
  return null;
}

const formValue = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === 'string' && value !== '' ? value : undefined;
};

export async function POST(req: Request) {
  try {
    // Rate limit: 3 applications per 10 minutes per IP
    if (!(await rateLimit(`careers:${getIp(req)}`, { limit: 3, windowMs: 10 * 60 * 1000 }))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const formData = await req.formData();

    const validation = applicationSchema.safeParse({
      fullName: formValue(formData, 'fullName'),
      email: formValue(formData, 'email'),
      phone: formValue(formData, 'phone'),
      position: formValue(formData, 'position'),
      otherPosition: formValue(formData, 'otherPosition'),
      message: formValue(formData, 'message'),
      website: formValue(formData, 'website'),
    });
    if (!validation.success) {
      return NextResponse.json({ error: 'Missing or invalid required fields' }, { status: 400 });
    }
    const { fullName, email, phone, position, otherPosition, message } = validation.data;

    // File processing
    const file = formData.get('file');
    const attachments: { filename: string; content: Buffer }[] = [];
    let safeFileName: string | null = null;

    if (file && typeof file !== 'string' && file.size > 0) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
      }
      const buffer = Buffer.from(await file.arrayBuffer());
      const type = detectDocumentType(buffer);
      if (!type) {
        return NextResponse.json({ error: 'Please upload a PDF, DOC or DOCX file' }, { status: 400 });
      }
      const baseName = file.name.replace(/\.[^.]*$/, '').replace(/[^a-zA-Z0-9 _-]/g, '').trim().slice(0, 80) || 'resume';
      safeFileName = `${baseName}.${type}`;
      attachments.push({ filename: safeFileName, content: buffer });
    }

    const role = position === 'Other' && otherPosition ? otherPosition : position;

    // Save to database
    let savedToDb = false;
    try {
      await prisma.application.create({
        data: {
          fullName,
          email,
          phone,
          position: role,
          message,
          resumeUrl: safeFileName, // Storing filename as a reference
        },
      });
      savedToDb = true;
    } catch (dbError) {
      console.error('Failed to save application to database:', dbError);
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_CONFIG.toEmail;
    const senderAddress = process.env.CONTACT_FROM_EMAIL || 'info@etssmart.com';
    const fromEmail = `${toHeaderSafe(fullName)} (${toHeaderSafe(email)}) <${senderAddress}>`;

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Career Application: ${toHeaderSafe(role)} - ${toHeaderSafe(fullName)}`,
      html: `
        ${message ? `<p style="white-space: pre-wrap;">${escapeHtml(message)}</p>` : `<p><em>No cover letter provided. Please see attached resume.</em></p>`}
        <br />
        <br />
        --<br />
        <strong>${escapeHtml(fullName)}</strong><br />
        Applied for: ${escapeHtml(role)}<br />
        Phone: ${escapeHtml(phone)}<br />
        Email: ${escapeHtml(email)}<br />
        <br />
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          <em>This application was submitted via the careers page on your website. The applicant's CV is attached.</em>
        </p>
      `,
      attachments,
    });

    if (sendError) {
      console.error('Resend error (careers):', sendError);
      // Without the email the CV is lost, but the application record is still in the dashboard.
      if (savedToDb) return NextResponse.json({ success: true });
      return NextResponse.json({ error: 'Failed to send application. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send application:', error);
    return NextResponse.json({ error: 'Failed to send application. Please try again later.' }, { status: 500 });
  }
}

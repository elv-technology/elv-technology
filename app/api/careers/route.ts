import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_CONFIG } from '@/lib/contact-config';
import { prisma } from '@/lib/prisma';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // Extract fields
    const fullName = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const position = formData.get('position') as string;
    const otherPosition = formData.get('otherPosition') as string;
    const message = formData.get('message') as string;

    // File processing
    const file = formData.get('file') as File | null;
    let attachments = [];

    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
      });
    }

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const role = position === 'Other' ? otherPosition : position;

    // Save to database
    try {
      await prisma.application.create({
        data: {
          fullName,
          email,
          phone,
          position: role,
          message,
          resumeUrl: file ? file.name : null, // Storing filename as a reference
        },
      });
    } catch (dbError) {
      console.error('Failed to save application to database:', dbError);
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_CONFIG.toEmail;

    console.log("ENV FROM:", process.env.CONTACT_FROM_EMAIL);
    const fromEmail = process.env.CONTACT_FROM_EMAIL
      ? `${fullName} (${email}) <${process.env.CONTACT_FROM_EMAIL}>`
      : `${fullName} (${email}) <info@etssmart.com>`;

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `New Career Application: ${role} - ${fullName}`,
      html: `
        ${message ? `<p style="white-space: pre-wrap;">${message}</p>` : `<p><em>No cover letter provided. Please see attached resume.</em></p>`}
        <br />
        <br />
        --<br />
        <strong>${fullName}</strong><br />
        Applied for: ${role}<br />
        Phone: ${phone}<br />
        Email: ${email}<br />
        <br />
        <hr style="border: 0; border-top: 1px solid #eaeaea; margin: 20px 0;" />
        <p style="color: #666; font-size: 12px;">
          <em>This application was submitted via the careers page on your website. The applicant's CV is attached.</em>
        </p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Failed to send application:', error);
    return NextResponse.json({ error: error.message || 'Failed to send application' }, { status: 500 });
  }
}

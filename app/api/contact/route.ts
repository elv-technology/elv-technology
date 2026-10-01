import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { CONTACT_CONFIG } from '@/lib/contact-config';
import { prisma } from '@/lib/prisma';
import { rateLimit, getIp } from '@/lib/rate-limit';
import { escapeHtml, toHeaderSafe } from '@/lib/escape-html';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  subject: z.string().trim().max(200).optional().default('General Inquiry'),
  message: z.string().trim().min(2).max(2000),
  source: z.enum(['website', 'chatbot']).optional().default('website'),
  isNotRobot: z.boolean().refine(val => val === true, "Must be a human"),
  // Honeypot: hidden from people, bots tend to fill it in.
  website: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    const ip = getIp(req);

    // Rate limit: 3 submissions per 10 minutes per IP
    if (!(await rateLimit(`contact:${ip}`, { limit: 3, windowMs: 10 * 60 * 1000 }))) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();

    // Server-side validation
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input data', details: validation.error.format() }, { status: 400 });
    }

    const { name, email, phone, subject, message, source } = validation.data;

    // Save to database
    let savedToDb = false;
    try {
      await prisma.inquiry.create({
        data: {
          name,
          email,
          phone,
          subject,
          message,
          source,
        },
      });
      savedToDb = true;
    } catch (dbError) {
      console.error('Failed to save inquiry to database:', dbError);
    }

    const senderAddress = process.env.CONTACT_FROM_EMAIL || 'info@etssmart.com';
    const fromEmail = `${toHeaderSafe(name)} (${toHeaderSafe(email)}) <${senderAddress}>`;

    const sourceName = source === 'chatbot' ? 'ETS Chatbot' : 'Contact Form';
    const emailSubject = `New Lead from ${sourceName}`;
    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_CONFIG.toEmail;

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Not provided');
    const safeSubject = escapeHtml(subject);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />');

    const { error: sendError } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: emailSubject,
      html: `
        <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
          <h2 style="color: #d32f2f; margin-top: 0;">New Lead from ${sourceName}</h2>
          <p style="font-size: 16px; font-weight: bold; color: #555;">Project Details: ${safeSubject}</p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />

          <p>Hello Team,</p>
          <p>You have received a new message from your ${sourceName.toLowerCase()}.</p>

          <p><strong>Details:</strong></p>
          <ul style="list-style: none; padding: 0;">
            <li style="margin-bottom: 8px;"><strong>Name:</strong> ${safeName}</li>
            <li style="margin-bottom: 8px;"><strong>Email:</strong> ${safeEmail}</li>
            <li style="margin-bottom: 8px;"><strong>number:</strong> ${safePhone}</li>
            <li style="margin-bottom: 8px;"><strong>Subject:</strong> ${safeSubject}</li>
          </ul>

          <p><strong>Message:</strong></p>
          <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #d32f2f;">
            ${safeMessage}
          </div>

          <p style="margin-top: 30px;">Thankyou!!</p>

          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0 10px;" />
          <p style="color: #888; font-size: 12px; font-style: italic;">
            This message was sent from the ${sourceName.toLowerCase()} by <strong>${safeName}</strong> (${safeEmail}).<br />
            You can reply directly to this email to contact them.
          </p>
        </div>
      `,
    });

    if (sendError) {
      console.error('Resend error (contact):', sendError);
      // The inquiry is still visible in the admin dashboard, so only fail if it was lost entirely.
      if (savedToDb) return NextResponse.json({ success: true });
      return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send email:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again later.' }, { status: 500 });
  }
}

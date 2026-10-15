import "server-only";
import { Resend } from "resend";
import { CONTACT_CONFIG } from "@/lib/contact-config";
import { toHeaderSafe } from "@/lib/escape-html";

let client: Resend | null = null;

function getResend() {
    if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not set");
    client ??= new Resend(process.env.RESEND_API_KEY);
    return client;
}

interface SiteEmail {
    /** The visitor who submitted the form; replies go to them. */
    senderName: string;
    senderEmail: string;
    subject: string;
    html: string;
    attachments?: { filename: string; content: Buffer }[];
}

/** Sends a form submission to the site's inbox. Returns false (and logs) when sending fails. */
export async function sendSiteEmail({ senderName, senderEmail, subject, html, attachments }: SiteEmail, label: string) {
    const toEmail = process.env.CONTACT_TO_EMAIL || CONTACT_CONFIG.toEmail;
    const senderAddress = process.env.CONTACT_FROM_EMAIL || "info@etssmart.com";

    try {
        const { error } = await getResend().emails.send({
            from: `${toHeaderSafe(senderName)} (${toHeaderSafe(senderEmail)}) <${senderAddress}>`,
            to: [toEmail],
            replyTo: senderEmail,
            subject,
            html,
            attachments,
        });
        if (error) {
            console.error(`Resend error (${label}):`, error);
            return false;
        }
        return true;
    } catch (error) {
        console.error(`Failed to send email (${label}):`, error);
        return false;
    }
}

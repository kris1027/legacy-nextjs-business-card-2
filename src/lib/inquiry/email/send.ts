import { Resend } from 'resend';
import { siteEmail } from '@/lib/config';
import type { InquiryPayload } from '../schema';
import { renderInquiryEmail } from './template';

export async function sendInquiryEmail(payload: InquiryPayload): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { subject, html, text } = renderInquiryEmail(payload);

  const { error } = await resend.emails.send({
    from: process.env.CONTACT_SENDER_EMAIL ?? 'onboarding@resend.dev',
    to: process.env.CONTACT_RECIPIENT_EMAIL ?? siteEmail,
    replyTo: payload.email,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}

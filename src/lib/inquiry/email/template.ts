import type { InquiryPayload } from '../schema';

type EmailOutput = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderInquiryEmail(payload: InquiryPayload): EmailOutput {
  const { name, email, service, topic, message } = payload;

  const serviceDisplay =
    service === 'inne' ? `Inne${topic ? ` - ${topic}` : ''}` : service;

  const subject = `Nowe zapytanie od ${name}`;

  const text = [
    `Od: ${name} <${email}>`,
    `Usługa: ${serviceDisplay}`,
    ``,
    message,
  ].join('\n');

  const html = `
    <p><strong>Od:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
    <p><strong>Usługa:</strong> ${escapeHtml(serviceDisplay)}</p>
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, '<br />')}</p>
  `.trim();

  return { subject, html, text };
}

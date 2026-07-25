import { describe, expect, it } from 'vitest';
import { renderInquiryEmail } from './template';

const payload = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  service: 'doradztwo-sprzetowe',
  message: 'Chciałbym się dowiedzieć więcej o usłudze.',
};

describe('renderInquiryEmail', () => {
  it('includes all inquiry fields in the rendered output', () => {
    const { subject, html, text } = renderInquiryEmail(payload);

    expect(subject).toContain(payload.name);

    expect(html).toContain(payload.name);
    expect(html).toContain(payload.email);
    expect(html).toContain(payload.service);
    expect(html).toContain(payload.message);

    expect(text).toContain(payload.name);
    expect(text).toContain(payload.email);
    expect(text).toContain(payload.service);
    expect(text).toContain(payload.message);
  });
});

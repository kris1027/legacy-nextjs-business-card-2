import { beforeEach, describe, expect, it, vi } from 'vitest';
import * as emailModule from './email/send';
import { processInquiry } from './submit';

vi.mock('./email/send');

const validPayload = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  service: 'doradztwo-sprzetowe' as const,
  message: 'Chciałbym się dowiedzieć więcej o usłudze.',
};

describe('processInquiry', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.mocked(emailModule.sendInquiryEmail).mockResolvedValue(undefined);
  });

  it('calls sendInquiryEmail and returns ok for a valid payload', async () => {
    const result = await processInquiry(validPayload);

    expect(emailModule.sendInquiryEmail).toHaveBeenCalledOnce();
    expect(emailModule.sendInquiryEmail).toHaveBeenCalledWith(validPayload);
    expect(result).toEqual({ ok: true });
  });

  it('returns ok:false and does not call sendInquiryEmail for an invalid payload', async () => {
    const result = await processInquiry({
      ...validPayload,
      email: 'not-an-email',
    });

    expect(emailModule.sendInquiryEmail).not.toHaveBeenCalled();
    expect(result).toMatchObject({ ok: false });
  });

  it('returns ok:false when sendInquiryEmail throws', async () => {
    vi.mocked(emailModule.sendInquiryEmail).mockRejectedValue(
      new Error('SMTP error')
    );
    const result = await processInquiry(validPayload);
    expect(result).toMatchObject({ ok: false });
  });
});

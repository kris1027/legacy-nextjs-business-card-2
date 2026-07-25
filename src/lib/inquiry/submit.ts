import { sendInquiryEmail } from './email/send';
import { inquirySchema, type InquiryPayload } from './schema';

type SubmitResult =
  | { ok: true }
  | { ok: false; error: string; showContact?: boolean };

export async function processInquiry(
  payload: InquiryPayload
): Promise<SubmitResult> {
  const parsed = inquirySchema.safeParse(payload);
  if (!parsed.success) {
    return { ok: false, error: 'Nieprawidłowe dane formularza.' };
  }

  try {
    await sendInquiryEmail(parsed.data);
  } catch {
    return {
      ok: false,
      error:
        'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz bezpośrednio na:',
      showContact: true,
    };
  }
  return { ok: true };
}

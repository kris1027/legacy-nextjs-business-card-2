import { z } from 'zod';
import { services } from '@/lib/services/data';

const serviceSlugs = services.map((s) => s.slug);
const validServiceValues = [...serviceSlugs, 'inne'];

export const inquirySchema = z
  .object({
    name: z
      .string()
      .min(2, 'Imię i nazwisko musi mieć co najmniej 2 znaki.')
      .max(80, 'Imię i nazwisko może mieć maksymalnie 80 znaków.'),
    email: z.email('Podaj prawidłowy adres e-mail.'),
    service: z.string().refine((val) => validServiceValues.includes(val), {
      message: 'Wybierz usługę.',
    }),
    topic: z
      .string()
      .max(200, 'Temat może mieć maksymalnie 200 znaków.')
      .optional(),
    message: z
      .string()
      .min(10, 'Wiadomość musi mieć co najmniej 10 znaków.')
      .max(2000, 'Wiadomość może mieć maksymalnie 2000 znaków.'),
  })
  .refine(
    (data) =>
      data.service !== 'inne' ||
      (!!data.topic && data.topic.trim().length >= 2),
    { message: 'Opisz temat zapytania.', path: ['topic'] }
  );

export type InquiryPayload = z.infer<typeof inquirySchema>;

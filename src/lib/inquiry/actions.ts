'use server';

import { headers } from 'next/headers';
import type { InquiryPayload } from '@/lib/inquiry/schema';
import { processInquiry } from '@/lib/inquiry/submit';
import { checkRateLimit } from '@/lib/inquiry/rate-limiter';

type RawSubmission = InquiryPayload & { _hp: string };

export async function submitInquiry(raw: RawSubmission) {
  if (raw._hp) {
    return { ok: true as const };
  }

  const headersList = await headers();
  const realIp = headersList.get('x-real-ip');
  const forwarded = headersList.get('x-forwarded-for');
  const ip = realIp ?? (forwarded ? forwarded.split(',')[0].trim() : 'unknown');

  if (!checkRateLimit(ip)) {
    return {
      ok: false as const,
      error: 'Zbyt wiele zapytań. Spróbuj ponownie za kilka minut.',
    };
  }

  return processInquiry({
    name: raw.name,
    email: raw.email,
    service: raw.service,
    topic: raw.topic,
    message: raw.message,
  });
}

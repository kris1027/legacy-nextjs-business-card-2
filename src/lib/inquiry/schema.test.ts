import { describe, expect, it } from 'vitest';
import { inquirySchema } from './schema';

const validPayload = {
  name: 'Jan Kowalski',
  email: 'jan@example.com',
  service: 'doradztwo-sprzetowe',
  message: 'Chciałbym się dowiedzieć więcej o usłudze.',
};

describe('inquirySchema', () => {
  it('accepts a valid payload', () => {
    const result = inquirySchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects name shorter than 2 characters', () => {
    const result = inquirySchema.safeParse({ ...validPayload, name: 'A' });
    expect(result.success).toBe(false);
  });

  it('accepts name at minimum length of 2 characters', () => {
    const result = inquirySchema.safeParse({ ...validPayload, name: 'AB' });
    expect(result.success).toBe(true);
  });

  it('accepts name at maximum length of 80 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      name: 'A'.repeat(80),
    });
    expect(result.success).toBe(true);
  });

  it('rejects name longer than 80 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      name: 'A'.repeat(81),
    });
    expect(result.success).toBe(false);
  });

  it('rejects message shorter than 10 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      message: 'A'.repeat(9),
    });
    expect(result.success).toBe(false);
  });

  it('accepts message at minimum length of 10 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      message: 'A'.repeat(10),
    });
    expect(result.success).toBe(true);
  });

  it('accepts message at maximum length of 2000 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      message: 'A'.repeat(2000),
    });
    expect(result.success).toBe(true);
  });

  it('rejects message longer than 2000 characters', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      message: 'A'.repeat(2001),
    });
    expect(result.success).toBe(false);
  });

  it('rejects an invalid email format', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown service slug', () => {
    const result = inquirySchema.safeParse({
      ...validPayload,
      service: 'unknown-service',
    });
    expect(result.success).toBe(false);
  });

  it.each(['name', 'email', 'service', 'message'] as const)(
    'rejects payload missing %s',
    (field) => {
      const payload = { ...validPayload, [field]: undefined };
      const result = inquirySchema.safeParse(payload);
      expect(result.success).toBe(false);
    }
  );
});

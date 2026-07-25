import { beforeEach, describe, expect, it } from 'vitest';
import {
  checkRateLimit,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW_MS,
  _resetStoreForTest,
} from './rate-limiter';

describe('checkRateLimit', () => {
  beforeEach(() => _resetStoreForTest());

  it('allows submissions up to the limit', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      expect(checkRateLimit('1.2.3.4')).toBe(true);
    }
  });

  it('blocks the submission that exceeds the limit', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.2.3.4');
    }
    expect(checkRateLimit('1.2.3.4')).toBe(false);
  });

  it('does not affect a different IP', () => {
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.2.3.4');
    }
    expect(checkRateLimit('5.6.7.8')).toBe(true);
  });

  it('resets the window after expiry', () => {
    const past = Date.now() - RATE_LIMIT_WINDOW_MS - 1;
    for (let i = 0; i < RATE_LIMIT_MAX; i++) {
      checkRateLimit('1.2.3.4', past);
    }
    expect(checkRateLimit('1.2.3.4')).toBe(true);
  });
});

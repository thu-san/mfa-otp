import { expect, test } from 'vitest';

import { getOTP } from './index';

test('check getOTP', () => {
  const secret = 'TESTING1234';
  const { otp, secondsRemaining } = getOTP({
    secretValue: secret,
    epochMS: 1725171196949,
  });

  expect(otp).toBe('763141');
  expect(secondsRemaining).toBe(13);
});

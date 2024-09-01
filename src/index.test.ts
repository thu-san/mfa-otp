import { expect, test } from 'vitest';

import { getOTP } from './index';

test('getOTP', () => {
  const secret = 'TESTING1234';
  const otp = getOTP({
    secretValue: secret,
    epochMS: 1725171196949,
  });
  expect(otp).toBe('763141');
});

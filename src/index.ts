import { createHmac } from 'crypto';

const dec2hex = (s: number) => {
  return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
};

const hex2dec = (s: string) => {
  return parseInt(s, 16);
};

const base32ToHex = (base32: string) => {
  const base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  let bits = '';
  let hex = '';

  for (const char of base32) {
    const val = base32chars.indexOf(char.toUpperCase());
    bits += val.toString(2).padStart(5, '0');
  }

  for (let i = 0; i + 4 <= bits.length; i += 4) {
    const chunk = bits.substring(i, i + 4);
    hex += parseInt(chunk, 2).toString(16);
  }
  return hex;
};

export const getOTP = ({
  secretValue,
  epochMS,
}: {
  secretValue: string;
  epochMS?: number;
}) => {
  const key = base32ToHex(secretValue);
  const epoch = Math.round((epochMS ?? new Date().getTime()) / 1000.0);
  const time = dec2hex(Math.floor(epoch / 30)).padStart(16, '0');

  const hmac = createHmac('sha1', Buffer.from(key, 'hex'))
    .update(Buffer.from(time, 'hex'))
    .digest('hex');

  const offset = hex2dec(hmac.substring(hmac.length - 1));
  // const part1 = hmac.substring(0, offset * 2);
  const part2 = hmac.substring(offset * 2, offset * 2 + 8);
  // const part3 = hmac.substring(
  //   offset * 2 + 8,
  //   offset * 2 + 8 + hmac.length - offset,
  // );

  let otp = (hex2dec(part2) & hex2dec('7fffffff')).toString().slice(-6);

  return otp;
};

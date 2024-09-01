# Simple MFA OTP generator

This is a simple OTP (One Time Password) generator that can be used to generate OTPs for two-factor authentication.

Includes CJS, ESM and UMD builds.

## Installation

For NPM:

```bash
npm install mfa-otp
```

For Browser: download the package and in `dist` folder you will find the UMD build `index.umd.js`.

```html
<script src="./dist/index.umd.js"></script>
<script>
  const otp = window.mfaOTP.getOTP({
    secretValue: 'SECRET_VALUE',
    epochMS: new Date().getTime(), // optional
  });
  console.log(otp);
</script>
```

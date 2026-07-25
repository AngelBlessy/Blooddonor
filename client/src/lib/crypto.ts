// Client-side salted hashing for the demo's localStorage-backed "accounts".
// There is no real backend database — this only protects against casually
// reading a plaintext password/OTP out of localStorage, not a determined
// attacker with access to devtools. Treat it as UX, not real security.

export function randomSalt(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function sha256Hex(text: string): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

export function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export async function hashOtp(otp: string, salt: string, target: string, purpose: string): Promise<string> {
  return sha256Hex(`${salt}:${target}:${purpose}:${otp}`);
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  return sha256Hex(`${salt}:bloodnet-password:${password}`);
}

export interface PasswordRecord {
  passwordSalt: string;
  passwordHash: string;
}

export async function createPasswordRecord(password: string): Promise<PasswordRecord> {
  const passwordSalt = randomSalt();
  return { passwordSalt, passwordHash: await hashPassword(password, passwordSalt) };
}

export async function passwordMatches(record: Partial<PasswordRecord>, password: string): Promise<boolean> {
  if (!record.passwordHash || !record.passwordSalt) return false;
  return (await hashPassword(password, record.passwordSalt)) === record.passwordHash;
}

const OTP_VALIDITY_MS = 10 * 60 * 1000;
const OTP_RESEND_DELAY_MS = 30 * 1000;

export interface OtpRecord {
  hash: string;
  salt: string;
  target: string;
  expiresAt: number;
  resendAt: number;
}

export async function createOtpRecord(target: string, purpose: string): Promise<{ otp: string; record: OtpRecord }> {
  const otp = generateOtp();
  const salt = randomSalt();
  const hash = await hashOtp(otp, salt, target, purpose);
  return {
    otp,
    record: {
      hash,
      salt,
      target,
      expiresAt: Date.now() + OTP_VALIDITY_MS,
      resendAt: Date.now() + OTP_RESEND_DELAY_MS,
    },
  };
}

export async function verifyOtpRecord(record: OtpRecord | null, otp: string, target: string, purpose: string): Promise<boolean> {
  if (!record || record.target !== target) return false;
  if (Date.now() > record.expiresAt) return false;
  const hash = await hashOtp(otp, record.salt, target, purpose);
  return hash === record.hash;
}

import { useState } from 'react';
import { createOtpRecord, createPasswordRecord, hashOtp, type OtpRecord } from '@/lib/crypto';
import { sendOtp, otpFailureMessage } from '@/lib/api';
import { resolveIdentifier } from '@/lib/identifier';
import { useUsersStore } from '@/store/users-store';
import type { FlowResult } from './types';

export function useForgotPassword() {
  const [pending, setPending] = useState<OtpRecord | null>(null);
  const users = useUsersStore((state) => state.users);
  const updateUser = useUsersStore((state) => state.updateUser);

  async function requestOtp(identifierInput: string): Promise<FlowResult> {
    const identifier = resolveIdentifier(identifierInput);
    if (!identifier) {
      return { ok: false, message: 'Enter a valid email address or 10-digit mobile number.' };
    }

    const hasAccount = users.some((user) =>
      identifier.channel === 'email' ? user.email === identifier.target : user.phone === identifier.target
    );
    if (!hasAccount) {
      return { ok: false, message: `No account was found for this ${identifier.label}.` };
    }

    const { otp, record } = await createOtpRecord(identifier.target, 'forgot-password');
    setPending(record);
    const delivery = await sendOtp({ channel: identifier.channel, target: identifier.target, otp });
    if (!delivery.delivered) {
      setPending(null);
      return { ok: false, message: otpFailureMessage(identifier.channel === 'email' ? 'email' : 'SMS') };
    }

    return {
      ok: true,
      message: `OTP has been sent to your ${identifier.channel === 'email' ? 'email address' : 'mobile number'}.`,
    };
  }

  async function resetPassword(identifierInput: string, otp: string, newPassword: string): Promise<FlowResult> {
    const identifier = resolveIdentifier(identifierInput);
    if (!identifier) {
      return { ok: false, message: 'Enter a valid email address or 10-digit mobile number.' };
    }
    if (!pending) return { ok: false, message: 'Request a password reset OTP first.' };
    if (Date.now() > pending.expiresAt) return { ok: false, message: 'OTP expired. Please request a new OTP.' };

    const hash = await hashOtp(otp, pending.salt, identifier.target, 'forgot-password');
    if (hash !== pending.hash) return { ok: false, message: 'Invalid password reset OTP.' };

    const user = users.find((entry) =>
      identifier.channel === 'email' ? entry.email === identifier.target : entry.phone === identifier.target
    );
    if (!user) return { ok: false, message: 'No account was found for this identifier.' };

    updateUser(user.key, await createPasswordRecord(newPassword));
    setPending(null);
    return { ok: true, message: 'Password reset successful. Please login.' };
  }

  function reset() {
    setPending(null);
  }

  return { pending, requestOtp, resetPassword, reset };
}

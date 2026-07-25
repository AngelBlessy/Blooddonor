import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { forgotPasswordSchema, type ForgotPasswordValues } from './schemas';
import type { useForgotPassword } from './use-forgot-password';

interface ForgotPasswordFormProps {
  requestOtp: ReturnType<typeof useForgotPassword>['requestOtp'];
  resetPassword: ReturnType<typeof useForgotPassword>['resetPassword'];
  onReset: (message?: string) => void;
  onBack: () => void;
}

export function ForgotPasswordForm({ requestOtp, resetPassword, onReset, onBack }: ForgotPasswordFormProps) {
  const [otpStatus, setOtpStatus] = useState<string>();
  const [sendingOtp, setSendingOtp] = useState(false);

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { identifier: '', otp: '', password: '', confirmPassword: '' },
  });

  async function handleSendOtp() {
    const valid = await form.trigger('identifier');
    if (!valid) return;
    setSendingOtp(true);
    const result = await requestOtp(form.getValues('identifier'));
    setSendingOtp(false);
    setOtpStatus(result.message);
    if (!result.ok) form.setError('identifier', { message: result.message });
  }

  async function onSubmit(values: ForgotPasswordValues) {
    const result = await resetPassword(values.identifier, values.otp, values.password);
    if (!result.ok) {
      form.setError('otp', { message: result.message });
      return;
    }
    onReset(result.message);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registered email or mobile number</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com or 10-digit phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-end gap-2">
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <Input inputMode="numeric" maxLength={6} placeholder="6-digit OTP" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="button" variant="outline" onClick={handleSendOtp} disabled={sendingOtp}>
            {sendingOtp ? 'Sending…' : 'Send OTP'}
          </Button>
        </div>
        {otpStatus && <p className="text-sm text-muted-foreground">{otpStatus}</p>}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="New password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm new password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Re-enter new password" autoComplete="new-password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Resetting…' : 'Reset password'}
        </Button>
        <Button type="button" variant="link" size="sm" className="w-full" onClick={onBack}>
          Back to login
        </Button>
      </form>
    </Form>
  );
}

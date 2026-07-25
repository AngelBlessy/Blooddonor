import { z } from 'zod';
import { BLOOD_GROUPS } from '@/lib/blood-compatibility';

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters.')
  .regex(/(?=.*[A-Za-z])(?=.*\d)/, 'Password must include a letter and a number.');

export const registerSchema = z
  .object({
    name: z.string().trim().min(3, 'Name must be at least 3 characters.'),
    age: z.coerce.number().int().min(1, 'Enter a valid age.').max(120, 'Enter a valid age.'),
    phone: z
      .string()
      .trim()
      .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number.'),
    email: z.string().trim().email('Enter a valid email address.'),
    password: passwordSchema,
    confirmPassword: z.string(),
    donatedEver: z.enum(['yes', 'no'], { error: 'Select whether you have donated before.' }),
    lastDonationDate: z.string().optional(),
    bloodGroup: z.enum(BLOOD_GROUPS, { error: 'Select a blood group.' }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
  .refine((values) => values.donatedEver !== 'yes' || Boolean(values.lastDonationDate), {
    message: 'Select your last donation date.',
    path: ['lastDonationDate'],
  })
  .refine(
    (values) => {
      if (values.donatedEver !== 'yes' || !values.lastDonationDate) return true;
      return new Date(`${values.lastDonationDate}T00:00:00`) <= new Date();
    },
    { message: 'Last donation date cannot be in the future.', path: ['lastDonationDate'] }
  );

export type RegisterValues = z.infer<typeof registerSchema>;
export type RegisterInput = z.input<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(1, 'Enter your password.'),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const forgotPasswordSchema = z
  .object({
    identifier: z.string().trim().min(1, 'Enter your registered email or mobile number.'),
    otp: z.string().regex(/^\d{6}$/, 'Enter the 6-digit OTP.'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

export const otpSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, 'Enter the 6-digit OTP.'),
});

export type OtpValues = z.infer<typeof otpSchema>;

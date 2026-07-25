import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { loginSchema, type LoginValues } from './schemas';
import { passwordMatches } from '@/lib/crypto';
import { useUsersStore } from '@/store/users-store';
import { useSessionStore } from '@/store/session-store';

interface LoginFormProps {
  onLoggedIn: () => void;
  onForgotPassword: () => void;
}

export function LoginForm({ onLoggedIn, onForgotPassword }: LoginFormProps) {
  const findByEmail = useUsersStore((state) => state.findByEmail);
  const login = useSessionStore((state) => state.login);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: LoginValues) {
    const email = values.email.trim().toLowerCase();
    const user = findByEmail(email);
    if (!user || !(await passwordMatches(user, values.password))) {
      form.setError('password', { message: 'Incorrect email or password.' });
      return;
    }
    if (!user.emailVerified || !user.phoneVerified) {
      form.setError('password', { message: 'Complete registration OTP verification before logging in.' });
      return;
    }
    login(user);
    onLoggedIn();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  autoComplete="off"
                  {...field}
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter password"
                  autoComplete="off"
                  {...field}
                  readOnly
                  onFocus={(e) => e.target.removeAttribute('readonly')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Signing in…' : 'Login'}
        </Button>
        <Button type="button" variant="link" size="sm" className="w-full" onClick={onForgotPassword}>
          Forgot password? Reset with OTP
        </Button>
      </form>
    </Form>
  );
}

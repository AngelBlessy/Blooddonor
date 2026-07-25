import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RegisterForm } from './register-form';
import { LoginForm } from './login-form';
import { ForgotPasswordForm } from './forgot-password-form';
import { OtpForm } from './otp-form';
import { useRegistration } from './use-registration';
import { useForgotPassword } from './use-forgot-password';
import { useUiStore } from '@/store/ui-store';

type Step = 'register' | 'login' | 'forgot' | 'otp';

const STEP_COPY: Record<Step, { title: string; description: string }> = {
  register: {
    title: 'Register or sign in',
    description: 'Verify your email and phone with OTP when registering. Sign in with your email and password.',
  },
  login: {
    title: 'Register or sign in',
    description: 'Verify your email and phone with OTP when registering. Sign in with your email and password.',
  },
  forgot: {
    title: 'Reset password',
    description: 'Enter the registered email or mobile number.',
  },
  otp: {
    title: 'Verify OTP',
    description: 'Enter the OTP sent to your email and phone.',
  },
};

export function AuthDialog() {
  const open = useUiStore((state) => state.authDialogOpen);
  const authDialogTab = useUiStore((state) => state.authDialogTab);
  const closeAuthDialog = useUiStore((state) => state.closeAuthDialog);

  const [step, setStep] = useState<Step>('register');
  const [otpMessage, setOtpMessage] = useState<string>();
  const registration = useRegistration();
  const forgotPassword = useForgotPassword();

  useEffect(() => {
    if (open) setStep(authDialogTab);
  }, [open, authDialogTab]);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      closeAuthDialog();
      registration.reset();
      forgotPassword.reset();
    }
  }

  function handleOtpSent(message?: string) {
    setOtpMessage(message);
    setStep('otp');
  }

  function handleOtpVerified() {
    toast.success('Registration OTP verified. Please log in.');
    setStep('login');
  }

  function handleLoggedIn() {
    closeAuthDialog();
    toast.success('Login successful.');
  }

  function handlePasswordReset(message?: string) {
    toast.success(message ?? 'Password reset successful. Please login.');
    setStep('login');
  }

  const copy = STEP_COPY[step];

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{copy.description}</DialogDescription>
        </DialogHeader>

        {step === 'otp' ? (
          <OtpForm
            expiresAt={registration.pending?.expiresAt}
            resendAt={registration.pending?.resendAt}
            message={otpMessage}
            verifyOtp={registration.verifyOtp}
            resendOtp={registration.resendOtp}
            onVerified={handleOtpVerified}
          />
        ) : step === 'forgot' ? (
          <ForgotPasswordForm
            requestOtp={forgotPassword.requestOtp}
            resetPassword={forgotPassword.resetPassword}
            onReset={handlePasswordReset}
            onBack={() => setStep('login')}
          />
        ) : (
          <Tabs value={step} onValueChange={(value) => setStep(value as Step)}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="register">Registration</TabsTrigger>
              <TabsTrigger value="login">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="register" className="pt-4">
              <RegisterForm submitRegistration={registration.submitRegistration} onOtpSent={handleOtpSent} />
            </TabsContent>
            <TabsContent value="login" className="pt-4">
              <LoginForm onLoggedIn={handleLoggedIn} onForgotPassword={() => setStep('forgot')} />
            </TabsContent>
          </Tabs>
        )}
      </DialogContent>
    </Dialog>
  );
}

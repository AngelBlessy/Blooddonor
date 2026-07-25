import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button, type buttonVariants } from '@/components/ui/button';
import { RaiseRequestForm } from '@/components/hospital/raise-request-form';
import type { VariantProps } from 'class-variance-authority';

interface EmergencyRequestDialogProps {
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
  className?: string;
}

export function EmergencyRequestDialog({ variant = 'default', size = 'lg', className }: EmergencyRequestDialogProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size} className={className}>
          {t('ctaPrimary')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('modalTitle')}</DialogTitle>
          <DialogDescription>{t('modalDesc')}</DialogDescription>
        </DialogHeader>
        <RaiseRequestForm submitLabel={t('modalSubmit')} onSubmitted={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: LucideIcon;
  className?: string;
}

export function StatCard({ label, value, icon: Icon, className }: StatCardProps) {
  return (
    <Card className={cn('gap-1.5 p-4', className)}>
      {Icon && <Icon className="size-5 text-primary" />}
      <p className="text-xl font-semibold sm:text-2xl">{value}</p>
      <p className="text-xs text-muted-foreground sm:text-sm">{label}</p>
    </Card>
  );
}

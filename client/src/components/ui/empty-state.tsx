import type { ReactNode } from 'react';

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">{children}</p>;
}

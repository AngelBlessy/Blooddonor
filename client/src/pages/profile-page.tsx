import { Navigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/layout/page-header';
import { useSessionStore } from '@/store/session-store';
import { TravelModeCard } from '@/components/profile/travel-mode-card';
import { DonorAlertsCard } from '@/components/profile/donor-alerts-card';

export function ProfilePage() {
  const session = useSessionStore((state) => state.session);
  const logout = useSessionStore((state) => state.logout);

  if (!session) return <Navigate to="/" replace />;
  const { user } = session;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Your profile"
        title="Welcome back"
        description="Your verified account details are shown below."
        action={
          <Button variant="outline" onClick={() => logout()}>
            Logout
          </Button>
        }
      />

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold">Account details</h3>
          <dl className="mt-3 space-y-2 text-sm">
            {[
              ['Role', user.role],
              ['Name', user.name],
              ['Email', user.email],
              ['Phone', user.phone],
              ['Blood group', user.bloodGroup],
              ['Age', String(user.age)],
              ['Last donation date', user.lastDonationDate],
              ['Travel mode', user.traveling ? 'On' : 'Off'],
            ].map(([label, value]) => (
              <div key={label} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                <dt className="text-muted-foreground">{label}</dt>
                <dd className="font-medium">{value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <TravelModeCard />
        <DonorAlertsCard />
      </div>
    </div>
  );
}

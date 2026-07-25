import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useSessionStore } from '@/store/session-store';
import { useUsersStore } from '@/store/users-store';

export function TravelModeCard() {
  const session = useSessionStore((state) => state.session);
  const updateSessionUser = useSessionStore((state) => state.updateSessionUser);
  const updateUser = useUsersStore((state) => state.updateUser);

  if (!session) return null;
  const traveling = session.user.traveling;

  function handleToggle(checked: boolean) {
    if (!session) return;
    updateUser(session.userKey, { traveling: checked });
    updateSessionUser({ traveling: checked });
    toast.success(
      checked
        ? 'Travel mode enabled. Emergency notifications are paused.'
        : 'Travel mode disabled. Emergency notifications will resume.'
    );
  }

  return (
    <Card className="gap-2 p-6">
      <h3 className="font-semibold">Travel mode</h3>
      <p className="text-sm text-muted-foreground">
        If you are travelling, you will not receive emergency notification for donation.
      </p>
      <div className="mt-2 flex items-center justify-between rounded-md border px-3 py-2.5">
        <span className="text-sm">Currently travel mode is {traveling ? 'on' : 'off'}.</span>
        <Switch checked={traveling} onCheckedChange={handleToggle} aria-label="Toggle travel mode" />
      </div>
    </Card>
  );
}

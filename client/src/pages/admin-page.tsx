import { Card } from '@/components/ui/card';
import { StatCard } from '@/components/ui/stat-card';
import { PageHeader } from '@/components/layout/page-header';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '@/components/ui/empty-state';
import { HospitalRequestCard } from '@/components/hospital/hospital-request-card';
import { useUsersStore } from '@/store/users-store';
import { useHospitalRequestsStore } from '@/store/hospital-requests-store';
import { useInventoryStore, LOW_STOCK_THRESHOLD } from '@/store/inventory-store';

export function AdminPage() {
  const donorCount = useUsersStore((state) => state.users.length);
  const requests = useHospitalRequestsStore((state) => state.requests);
  const inventory = useInventoryStore((state) => state.items);

  const openRequests = requests.filter((request) => request.status !== 'Completed');
  const lowStock = inventory.filter((item) => item.units < LOW_STOCK_THRESHOLD);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Network administration"
        title="Monitor the complete response network"
        description="Review demand, donor response, inventory pressure, and recent emergency activity."
      />

      <div className="mt-6 grid grid-cols-3 gap-4">
        <StatCard label="Registered donors" value={donorCount} />
        <StatCard label="Open emergencies" value={openRequests.length} />
        <StatCard label="Low-stock groups" value={lowStock.length} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <span className="text-sm font-medium text-primary">Operational alerts</span>
          <h2 className="mb-4 text-lg font-semibold">Priority actions</h2>
          <div className="space-y-3">
            {lowStock.length === 0 ? (
              <EmptyState>All groups are adequately stocked.</EmptyState>
            ) : (
              lowStock.map((item) => (
                <Card key={item.group} className="flex-row items-center justify-between gap-3 p-4">
                  <div>
                    <h4 className="font-semibold">{item.group} is low</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.units} units in {item.location}; replenish stock.
                    </p>
                  </div>
                  <Badge variant="destructive">Action</Badge>
                </Card>
              ))
            )}
          </div>
        </Card>

        <Card className="p-6">
          <span className="text-sm font-medium text-primary">Activity overview</span>
          <h2 className="mb-4 text-lg font-semibold">Recent requests</h2>
          <div className="space-y-3">
            {requests.length === 0 ? (
              <EmptyState>No emergency requests recorded.</EmptyState>
            ) : (
              requests.slice(0, 6).map((request) => <HospitalRequestCard key={request.id} request={request} />)
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

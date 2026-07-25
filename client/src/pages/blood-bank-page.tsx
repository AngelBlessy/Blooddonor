import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/layout/page-header';
import { InventoryForm } from '@/components/blood-bank/inventory-form';
import { InventoryGrid } from '@/components/blood-bank/inventory-grid';

export function BloodBankPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        eyebrow="Workspace"
        title="Blood Bank Dashboard"
        description="Manage available blood units, stock levels, and shortage alerts."
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <span className="text-sm font-medium text-primary">Inventory update</span>
          <h2 className="mb-4 text-lg font-semibold">Record blood stock</h2>
          <InventoryForm />
        </Card>

        <Card className="p-6">
          <span className="text-sm font-medium text-primary">Live stock</span>
          <h2 className="mb-4 text-lg font-semibold">Blood unit repository</h2>
          <InventoryGrid />
        </Card>
      </div>
    </div>
  );
}

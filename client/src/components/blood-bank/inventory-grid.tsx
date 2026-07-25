import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useInventoryStore, LOW_STOCK_THRESHOLD } from '@/store/inventory-store';

export function InventoryGrid() {
  const items = useInventoryStore((state) => state.items);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => {
        const low = item.units < LOW_STOCK_THRESHOLD;
        return (
          <Card key={item.group} className={`gap-1 p-4 ${low ? 'border-destructive/40' : ''}`}>
            <div className="flex items-center justify-between">
              <strong className="text-lg">{item.group}</strong>
              {low && (
                <Badge variant="destructive" className="text-[10px]">
                  Low stock
                </Badge>
              )}
            </div>
            <p className="text-sm font-medium">{item.units} units</p>
            <p className="text-xs text-muted-foreground">
              {item.location} — Exp: {item.expiry}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

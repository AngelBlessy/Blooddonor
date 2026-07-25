import { useUsersStore } from './users-store';
import { useSessionStore } from './session-store';
import { useHospitalRequestsStore } from './hospital-requests-store';
import { useInventoryStore } from './inventory-store';

const SYNCED_KEYS = new Set([
  'bloodnet.users.v1',
  'bloodnet.session.v1',
  'bloodnet.hospital-requests.v1',
  'bloodnet.inventory.v1',
]);

// Other tabs write to the same localStorage keys — rehydrate on change so
// every open tab reflects the latest state without a manual refresh.
export function setupCrossTabSync(): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (!event.key || !SYNCED_KEYS.has(event.key)) return;
    void useUsersStore.persist.rehydrate();
    void useSessionStore.persist.rehydrate();
    void useHospitalRequestsStore.persist.rehydrate();
    void useInventoryStore.persist.rehydrate();
  };
  window.addEventListener('storage', handleStorage);
  return () => window.removeEventListener('storage', handleStorage);
}

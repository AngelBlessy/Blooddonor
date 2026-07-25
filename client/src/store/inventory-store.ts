import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { BloodGroup, InventoryItem } from '@/types/domain';
import { BLOOD_GROUPS } from '@/lib/blood-compatibility';

const SEED_UNITS: Record<BloodGroup, number> = {
  'O+': 18,
  'O-': 4,
  'A+': 15,
  'A-': 3,
  'B+': 12,
  'B-': 4,
  'AB+': 7,
  'AB-': 2,
};

const DEFAULT_INVENTORY: InventoryItem[] = BLOOD_GROUPS.map((group) => ({
  group,
  units: SEED_UNITS[group],
  expiry: '2026-08-15',
  location: 'Cold room A',
}));

export const LOW_STOCK_THRESHOLD = 5;

interface InventoryState {
  items: InventoryItem[];
  updateItem: (group: BloodGroup, updates: Omit<InventoryItem, 'group'>) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: DEFAULT_INVENTORY,
      updateItem: (group, updates) =>
        set((state) => {
          const exists = state.items.some((item) => item.group === group);
          return {
            items: exists
              ? state.items.map((item) => (item.group === group ? { ...item, ...updates } : item))
              : [...state.items, { group, ...updates }],
          };
        }),
    }),
    { name: 'bloodnet.inventory.v1' }
  )
);

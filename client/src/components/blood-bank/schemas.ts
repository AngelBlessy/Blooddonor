import { z } from 'zod';
import { BLOOD_GROUPS } from '@/lib/blood-compatibility';

export const inventorySchema = z.object({
  group: z.enum(BLOOD_GROUPS, { error: 'Select a blood group.' }),
  units: z.coerce.number().int().min(0, 'Units cannot be negative.'),
  expiry: z.string().min(1, 'Select the nearest expiry date.'),
  location: z.string().trim().min(1, 'Enter a storage location.'),
});

export type InventoryValues = z.infer<typeof inventorySchema>;
export type InventoryInput = z.input<typeof inventorySchema>;

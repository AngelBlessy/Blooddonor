import { z } from 'zod';
import { BLOOD_GROUPS } from '@/lib/blood-compatibility';

export const raiseRequestSchema = z.object({
  patient: z.string().trim().min(1, 'Enter a patient / case reference.'),
  bloodGroup: z.enum(BLOOD_GROUPS, { error: 'Select a blood group.' }),
  units: z.coerce.number().int().min(1, 'Units must be at least 1.'),
  priority: z.enum(['Critical', 'Urgent', 'Routine'], { error: 'Select a priority.' }),
});

export type RaiseRequestValues = z.infer<typeof raiseRequestSchema>;
export type RaiseRequestInput = z.input<typeof raiseRequestSchema>;

import { useUsersStore } from '@/store/users-store';

const BASELINE_DONORS = 12480;

export function useLiveDonorCount(): number {
  return useUsersStore((state) => BASELINE_DONORS + state.users.length);
}

import type { BloodGroup, User } from '@/types/domain';
import { isDonorCompatible } from '@/lib/blood-compatibility';

export function eligibleDonorsFor(users: User[], bloodGroup: BloodGroup): User[] {
  return users.filter((user) => !user.traveling && isDonorCompatible(bloodGroup, user.bloodGroup));
}

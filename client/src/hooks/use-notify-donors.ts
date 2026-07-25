import { useUsersStore } from '@/store/users-store';
import { useHospitalRequestsStore } from '@/store/hospital-requests-store';
import { eligibleDonorsFor } from '@/lib/donor-matching';
import { sendEmergencyAlerts } from '@/lib/api';
import type { HospitalRequest, User } from '@/types/domain';

interface NotifyResult {
  ok: boolean;
  message: string;
  donors: User[];
}

export function useNotifyDonors() {
  const users = useUsersStore((state) => state.users);
  const updateRequest = useHospitalRequestsStore((state) => state.updateRequest);

  async function notifyDonorsForRequest(request: HospitalRequest): Promise<NotifyResult> {
    const donors = eligibleDonorsFor(users, request.bloodGroup);

    if (!donors.length) {
      updateRequest(request.id, { matches: 0, status: 'No compatible donors available' });
      return { ok: false, message: 'No compatible registered donors are currently available.', donors };
    }

    updateRequest(request.id, { status: 'Sending emergency alerts', matches: donors.length });

    try {
      const result = await sendEmergencyAlerts(
        { patient: request.patient, bloodGroup: request.bloodGroup, units: request.units, priority: request.priority },
        donors.map(({ name, email, phone }) => ({ name, email, phone }))
      );
      updateRequest(request.id, { status: `Alerts sent: ${result.emailSent} email, ${result.smsSent} SMS` });
      return {
        ok: true,
        message: `Alert sent to ${donors.length} donor${donors.length === 1 ? '' : 's'} (${result.emailSent} email, ${result.smsSent} SMS).`,
        donors,
      };
    } catch (error) {
      console.error('Emergency alert delivery failed:', error instanceof Error ? error.message : error);
      updateRequest(request.id, { status: 'Alert delivery could not be completed' });
      return { ok: false, message: 'Something went wrong sending alerts. Please try again.', donors };
    }
  }

  return { notifyDonorsForRequest };
}

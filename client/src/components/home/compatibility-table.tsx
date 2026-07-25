import { useTranslation } from 'react-i18next';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BLOOD_GROUPS, COMPATIBLE_DONOR_GROUPS } from '@/lib/blood-compatibility';

export function CompatibilityTable() {
  const { t } = useTranslation();

  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('compatNeed')}</TableHead>
            <TableHead>{t('compatReceive')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {BLOOD_GROUPS.map((group) => (
            <TableRow key={group}>
              <TableCell className="font-medium">{group}</TableCell>
              <TableCell className="text-muted-foreground">{COMPATIBLE_DONOR_GROUPS[group].join(', ')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';

const ROLES = [
  { number: '01', titleKey: 'role1Title', markKey: 'role1Mark', descKey: 'role1Desc' },
  { number: '02', titleKey: 'role2Title', markKey: 'role2Mark', descKey: 'role2Desc' },
  { number: '03', titleKey: 'role3Title', markKey: 'role3Mark', descKey: 'role3Desc' },
  { number: '04', titleKey: 'role4Title', markKey: 'role4Mark', descKey: 'role4Desc' },
] as const;

export function RolesSection() {
  const { t } = useTranslation();

  return (
    <section id="roles" className="bg-secondary/30 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-medium text-primary">{t('rolesEyebrow')}</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight">{t('rolesTitle')}</h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ROLES.map(({ number, titleKey, markKey, descKey }) => (
            <Card key={number} className="gap-2 p-5">
              <span className="text-2xl font-display font-semibold text-muted-foreground/50">{number}</span>
              <span className="text-xs font-semibold tracking-wide text-primary uppercase">{t(markKey)}</span>
              <h3 className="font-semibold">{t(titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(descKey)}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

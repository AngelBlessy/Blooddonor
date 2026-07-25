import { HeroSection } from '@/components/home/hero-section';
import { RolesSection } from '@/components/home/roles-section';
import { FeaturesSection } from '@/components/home/features-section';
import { FaqSection } from '@/components/home/faq-section';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <RolesSection />
      <FeaturesSection />
      <FaqSection />
    </>
  );
}

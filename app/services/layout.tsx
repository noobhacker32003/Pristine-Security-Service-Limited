import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Security Services — Guarding, CCTV, Event & Building Security',
  description: 'Explore our comprehensive security solutions including uniformed guarding, special event security, control room operations, physical protection, and corporate security across Bangladesh.',
  alternates: { canonical: '/services' },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

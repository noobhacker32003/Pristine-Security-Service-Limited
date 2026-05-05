import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Request Security Services — Get a Free Quote',
  description: 'Request a customized security plan from Pristine Security Service Limited. Tell us about your physical security or corporate security needs in Bangladesh and get a free quote within 24 hours.',
  alternates: { canonical: '/get-service' },
};

export default function GetServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hire Us / Get Service',
  description: 'Request a customized security plan from Pristine Security Service Limited. Tell us about your physical security or corporate security needs in Bangladesh and get a quote.',
};

export default function GetServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

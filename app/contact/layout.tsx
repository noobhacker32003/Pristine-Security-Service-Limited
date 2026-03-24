import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact Pristine Security Service Limited in Banani, Dhaka. Reach out for professional corporate security, guarding, and bespoke protection services.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

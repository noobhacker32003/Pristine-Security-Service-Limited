import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch for Security Solutions',
  description: 'Contact Pristine Security Service Limited in Mohakhali DOHS, Dhaka. Call 02-58817173-4 or email info@pristinesecurity.org for professional security services and custom quotes.',
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

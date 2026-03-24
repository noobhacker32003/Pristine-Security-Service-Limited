import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Pristine Security Service Limited (PSSL). Founded in 2009, we provide military-like discipline and highly trained professional security guards in Bangladesh.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Our History, Mission & Vision',
  description: 'Learn about Pristine Security Service Limited — founded in 2009 by ex-military professionals. Discover our mission, vision, values, and 3,500+ strong team protecting businesses across Bangladesh.',
  alternates: { canonical: '/about' },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Special Offers — Exclusive Security Service Deals',
    description: 'Check out the latest exclusive offers and promotions from Pristine Security Service Limited. Get premium security solutions at special rates for a limited time.',
    alternates: { canonical: '/offer' },
};

export default function OfferLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

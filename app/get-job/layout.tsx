import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Career Opportunities — Join Our Security Team',
    description: 'Explore career opportunities at Pristine Security Service Limited. Join our 3,500+ strong team of security professionals. Apply for open positions in guard services, supervision, and more across Bangladesh.',
    alternates: { canonical: '/get-job' },
};

export default function GetJobLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}

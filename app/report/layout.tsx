import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Report Incident',
  robots: {
    index: false,
    follow: false,
  },
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

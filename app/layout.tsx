import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pristinesecurity.org'),
  title: {
    default: "Pristine Security Service Limited | Elite Security Bangladesh",
    template: "%s | Pristine Security Service Limited",
  },
  description: "Pristine Security Service Limited provides elite, professional security solutions in Bangladesh including uniformed guarding, corporate security, event security, and physical protection.",
  keywords: ["security service Bangladesh", "security guard company Dhaka", "corporate security Bangladesh", "event security", "building security", "Pristine Security", "uniformed guarding", "physical protection"],
  icons: {
    icon: "/assets/logo1.png",
    shortcut: "/assets/logo1.png",
    apple: "/assets/logo1.png",
  },
  openGraph: {
    title: "Pristine Security Service Limited",
    description: "Professional Security Services Company protecting your business and property in Bangladesh.",
    url: "https://www.pristinesecurity.org",
    siteName: "Pristine Security Service Limited",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/assets/logo1.png",
        width: 800,
        height: 600,
        alt: "Pristine Security Service Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pristine Security Service Limited",
    description: "Professional Security Services Company protecting your business and property in Bangladesh.",
    images: ["/assets/logo1.png"],
  },
  alternates: {
    canonical: '/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Pristine Security Service Limited',
  description: 'Elite professional security solutions in Bangladesh including uniformed guarding, corporate security, event security, and physical protection.',
  url: 'https://www.pristinesecurity.org',
  logo: 'https://www.pristinesecurity.org/assets/logo1.png',
  telephone: '+880-2-58817173',
  email: 'info@pristinesecurity.org',
  foundingDate: '2009',
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 3500 },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'House-223, Lake Road, Lane-15, Mohakhali DOHS',
    addressLocality: 'Dhaka',
    postalCode: '1206',
    addressCountry: 'BD',
  },
  areaServed: { '@type': 'Country', name: 'Bangladesh' },
  sameAs: ['https://www.pristinesecurity.org'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans text-slate-900 bg-slate-50`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <QueryProvider>
          <Navbar />
          <main className="min-h-screen pt-20">
            {children}
          </main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

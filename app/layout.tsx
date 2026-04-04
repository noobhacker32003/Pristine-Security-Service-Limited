import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  title: {
    default: "Pristine Security Service Limited | Elite Security Bangladesh",
    template: "%s | Pristine Security Service Limited",
  },
  description: "Pristine Security Service Limited provides elite, professional security solutions in Bangladesh including uniformed guarding, corporate security, event security, and physical protection.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Pristine Security Service Limited",
    description: "Professional Security Services Company protecting your business and property in Bangladesh.",
  },
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
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

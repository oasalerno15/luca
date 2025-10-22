import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Analytics from "@/components/Analytics";

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
    default: "The Integrator Project - Advancing Learning for All",
    template: "%s | The Integrator Project"
  },
  description: "A mission-driven tutoring platform built on experience serving low-income communities, students with disabilities, and learners at all levels. We make quality math education accessible to everyone.",
  keywords: ["tutoring", "math education", "inclusive learning", "accessible education", "volunteer tutoring", "learning differences", "educational equity", "online tutoring", "MoMath", "mathematics"],
  authors: [{ name: "The Integrator Project" }],
  creator: "The Integrator Project",
  publisher: "The Integrator Project",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://integratorproject.org'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "The Integrator Project - Advancing Learning for All",
    description: "Making quality tutoring accessible through compassionate mentorship and inclusive education.",
    url: 'https://integratorproject.org',
    siteName: "The Integrator Project",
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "The Integrator Project - Advancing Learning for All",
    description: "Making quality tutoring accessible through compassionate mentorship and inclusive education.",
    creator: '@integratorproj',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}

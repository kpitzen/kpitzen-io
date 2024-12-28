import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL('https://kpitzen.io'),
  title: {
    default: 'Kyle Pitzen',
    template: '%s | Kyle Pitzen',
  },
  description: 'A space for thoughts and reflections on software engineering, mathematics, music, and other interesting things.',
  keywords: ['software engineering', 'mathematics', 'music', 'blog', 'technology'],
  authors: [{ name: 'Kyle Pitzen' }],
  creator: 'Kyle Pitzen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kpitzen.io',
    siteName: 'Kyle Pitzen',
    images: [
      {
        url: '/images/default-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@kpitzen',
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-96x96.png",
  },
  alternates: {
    types: {
      'application/rss+xml': 'https://kpitzen.io/feed.xml',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

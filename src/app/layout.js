import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/shared/LayoutWrapper";
import { Analytics } from '@vercel/analytics/next';

// Development helper for image positioning issues
if (process.env.NODE_ENV === "development") {
  import("../lib/devImageFix.js");
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CodeMurf - AI-Powered Development Platform",
  description: "Transform your development workflow with CodeMurf's AI-powered tools. Build, deploy, and scale applications faster with intelligent code generation and automation.",
  keywords: "AI development, code generation, automation, software development, programming tools, CodeMurf",
  authors: [{ name: "CodeMurf Team" }],
  creator: "CodeMurf",
  publisher: "CodeMurf",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codemurf.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "CodeMurf - AI-Powered Development Platform",
    description: "Transform your development workflow with CodeMurf's AI-powered tools. Build, deploy, and scale applications faster.",
    url: 'https://codemurf.com',
    siteName: 'CodeMurf',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CodeMurf - AI-Powered Development Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "CodeMurf - AI-Powered Development Platform",
    description: "Transform your development workflow with CodeMurf's AI-powered tools.",
    images: ['/og-image.png'],
    creator: '@codemurf',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
      </body>
    </html>
  );
}

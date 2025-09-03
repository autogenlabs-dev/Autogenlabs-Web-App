import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/shared/LayoutWrapper";
import { Analytics } from '@vercel/analytics/next';
import { OrganizationSchema, WebsiteSchema, SoftwareApplicationSchema } from "../components/seo/StructuredData.jsx";
import Script from 'next/script';

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
  title: {
    default: "CodeMurf - AI-Powered Development Platform",
    template: "%s | CodeMurf"
  },
  description: "Transform your development workflow with CodeMurf's AI-powered tools. Build, deploy, and scale applications faster with intelligent code generation and automation.",
  keywords: "AI development, code generation, automation, software development, programming tools, CodeMurf, web development, app development, AI coding assistant",
  authors: [{ name: "CodeMurf Team", url: "https://codemurf.com" }],
  creator: "CodeMurf",
  publisher: "CodeMurf",
  category: "Technology",
  applicationName: "CodeMurf",
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
        type: 'image/png',
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
    site: '@codemurf',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'szzwdNXXmtQxzUKy4qTmO6Pk8IM51TAQcdnA9j_ZsqU',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/favicon-48x48.svg', sizes: '48x48', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Standard favicon */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        
        {/* SVG favicon for modern browsers */}
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        
        {/* Different sizes for various use cases */}
        <link rel="icon" type="image/svg+xml" sizes="16x16" href="/favicon-16x16.svg" />
        <link rel="icon" type="image/svg+xml" sizes="32x32" href="/favicon.svg" />
        <link rel="icon" type="image/svg+xml" sizes="48x48" href="/favicon-48x48.svg" />
        
        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        
        {/* Web app manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme color for browser UI */}
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <SoftwareApplicationSchema />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
        
        {/* SEO Monitoring Script */}
        <Script id="seo-monitoring" strategy="afterInteractive">
          {`
            if (typeof window !== 'undefined' && '${process.env.NODE_ENV}' === 'development') {
              import('/src/lib/seo-monitor.js').then(({ initSEOMonitoring }) => {
                initSEOMonitoring();
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}


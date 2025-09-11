import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/shared/LayoutWrapper";
import { Analytics } from '@vercel/analytics/next';
import { OrganizationSchema, WebsiteSchema, SoftwareApplicationSchema } from "../components/seo/StructuredData";
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
    default: "AI Code Builder | Codemurf",
    template: "%s | Codemurf"
  },
  description: "AI Code Builder by Codemurf lets you instantly generate websites and apps using AI. No coding required — build faster, smarter, and easier.",
  keywords: [
    "AI website builder",
    "AI code generator",
    "AI Code Builder",
    "Codemurf",
    "no code website builder",
    "AI app builder",
  ],
  authors: [{ name: "Codemurf Team", url: "https://codemurf.com" }],
  creator: "Codemurf",
  publisher: "Codemurf",
  category: "Technology",
  applicationName: "Codemurf",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codemurf.com'),
  alternates: {
    canonical: "https://codemurf.com",
  },
  openGraph: {
    title: "AI Code Builder | Codemurf",
    description: "Create websites instantly with AI Code Builder. Just describe it, and Codemurf builds your live site.",
    url: 'https://codemurf.com',
    siteName: 'Codemurf',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Code Builder - Codemurf',
        type: 'image/png',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "AI Code Builder | Codemurf",
    description: "Build websites instantly with Codemurf's AI Code Builder. No coding required — go live in seconds.",
    images: ['/og-image.png'],
    creator: '@codemurf',
    site: '@codemurf',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      maxSnippet: -1,
      maxImagePreview: "large",
      maxVideoPreview: -1,
    },
  },
  verification: {
    google: 'szzwdNXXmtQxzUKy4qTmO6Pk8IM51TAQcdnA9j_ZsqU',
  },
  manifest: '/site.webmanifest',
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
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


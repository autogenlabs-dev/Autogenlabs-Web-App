import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "../components/shared/LayoutWrapper";
import { Analytics } from '@vercel/analytics/next';
import { OrganizationSchema, WebsiteSchema, SoftwareApplicationSchema } from "../components/seo/StructuredData";
import Script from 'next/script';
import SEOMonitor from "../components/SEOMonitor";

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
    default: "AI Code Builder - Next-Gen VS Code AI Agent | Write Code 10x Faster",
    template: "%s | Codemurf AI Code Builder - Your Intelligent Coding Partner",
  },
  description:
    "Transform your coding workflow with AI Code Builder - the most advanced VS Code AI agent that writes, debugs, and optimizes code in real-time. Join 50,000+ developers using Codemurf to ship code faster than Cursor or Windsurf. Experience intelligent code generation, automated refactoring, and context-aware suggestions powered by cutting-edge AI.",
  keywords:
    "AI code builder, VS Code AI agent, Codemurf extension, AI pair programming, intelligent code generation, automated code refactoring, AI debugging assistant, code optimization AI, Cursor alternative 2025, Windsurf competitor, GitHub Copilot alternative, AI software development tools, machine learning code assistant, smart code completion, AI-powered IDE, developer productivity tools, code automation, AI coding companion, real-time code suggestions, context-aware programming assistant",
  authors: [{ name: "Codemurf Engineering", url: "https://codemurf.com/team" }],
  creator: "Codemurf AI",
  publisher: "Codemurf Technologies",
  category: "AI Development Tools",
  applicationName: "Codemurf AI Code Builder",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://codemurf.com"),
  alternates: {
    canonical: "https://codemurf.com",
    languages: {
      'en-US': 'https://codemurf.com/en-US',
      'es-ES': 'https://codemurf.com/es',
    },
  },

  // ✅ Enhanced Open Graph for maximum social engagement
  openGraph: {
    title: "AI Code Builder by Codemurf | Ship Code 10x Faster with AI",
    description:
      "Experience the future of coding with Codemurf's AI Code Builder. Generate production-ready code, fix bugs instantly, and accelerate your development workflow - all within VS Code. Trusted by 50,000+ developers worldwide.",
    url: "https://marketplace.visualstudio.com/items?itemName=codemurf.codemurf",
    siteName: "Codemurf - AI Code Builder",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Codemurf AI Code Builder - Transform Your VS Code Into an AI-Powered IDE",
        type: "image/svg+xml",
      }
    ],
    locale: "en_US",
  // OpenGraph "type" must be a valid enum like 'website', 'article', 'profile', etc.
  type: "website",
    determiner: "the",
  },

  // ✅ Optimized Twitter Cards for viral potential
  twitter: {
    card: "summary_large_image",
    title: "🚀 AI Code Builder - Your AI Coding Superpower in VS Code",
    description:
      "Write code 10x faster with Codemurf's intelligent AI agent. Generate, debug, and optimize code with context-aware AI that understands your entire codebase. Better than Cursor & Windsurf.",
    images: ["/og-image.svg"],
    creator: "@codemurf",
    site: "@codemurf",
  },

  // ✅ Enhanced Robots for better crawling
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": 320,
    },
  },

  // ✅ Verification & Analytics
  verification: {
    google: "szzwdNXXmtQxzUKy4qTmO6Pk8IM51TAQcdnA9j_ZsqU",
    yandex: "your-yandex-verification",
    bing: "your-bing-verification",
  },

  manifest: "/site.webmanifest",

  // ✅ Enhanced Favicons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/favicon-48x48.svg", sizes: "48x48", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },

  // ✅ Additional SEO enhancements
  other: {
    "msapplication-TileColor": "#2b5797",
    "theme-color": "#ffffff",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
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
        suppressHydrationWarning={true}
      >
        <OrganizationSchema />
        <WebsiteSchema />
        <SoftwareApplicationSchema />
        <LayoutWrapper>{children}</LayoutWrapper>
        <Analytics />
        
        {/* SEO Monitoring Component */}
        <SEOMonitor />
      </body>
    </html>
  );
}


'use client';

import React from 'react';

// Individual schema components for specific structured data types
export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AutogenLabs",
    "description": "AI-powered automation and workflow solutions for modern businesses",
    "url": "https://autogenlabs.vercel.app",
    "logo": {
      "@type": "ImageObject",
      "url": "https://autogenlabs.vercel.app/logo.svg",
      "width": "200",
      "height": "60"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/autogenlabs",
      "https://linkedin.com/company/autogenlabs",
      "https://github.com/autogenlabs"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
};

export const WebsiteSchema = () => {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AutogenLabs",
    "description": "AI-powered automation and workflow solutions for modern businesses",
    "url": "https://autogenlabs.vercel.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://autogenlabs.vercel.app/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
    />
  );
};

export const SoftwareApplicationSchema = () => {
  const softwareData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "AutogenLabs Platform",
    "description": "Comprehensive AI automation platform for businesses of all sizes",
    "url": "https://autogenlabs.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free tier available with premium features"
    },
    "creator": {
      "@type": "Organization",
      "name": "AutogenLabs"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "250"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareData) }}
    />
  );
};

// Generic StructuredData component (original)
const StructuredData = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;

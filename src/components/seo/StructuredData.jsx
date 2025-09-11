'use client';

import React from 'react';

// Individual schema components for specific structured data types
export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodeMurf",
    "description": "AI-powered development platform with online code compiler supporting Java, Python, JavaScript and 50+ languages",
    "url": "https://codemurf.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://codemurf.com/logo.svg",
      "width": "200",
      "height": "60"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://twitter.com/codemurf",
      "https://linkedin.com/company/codemurf",
      "https://github.com/codemurf"
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
    "name": "CodeMurf",
    "description": "AI-powered code editor and online compiler supporting Java, Python, JavaScript and 50+ programming languages",
    "url": "https://codemurf.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://codemurf.com/search?q={search_term_string}"
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
    "name": "CodeMurf AI Code Editor",
    "description": "AI-powered online code compiler and editor supporting Java, Python, JavaScript and 50+ programming languages with intelligent code completion",
    "url": "https://codemurf.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free online compiler with premium AI features"
    },
    "creator": {
      "@type": "Organization",
      "name": "CodeMurf"
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

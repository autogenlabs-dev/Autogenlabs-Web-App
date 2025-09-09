'use client';

import React from 'react';

// Individual schema components for specific structured data types
export const OrganizationSchema = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Codemurf",
    "description": "AI-powered coding assistant with intelligent code editor and compiler supporting 50+ programming languages",
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
    "name": "Codemurf",
    "description": "AI-powered coding assistant with intelligent code editor and compiler supporting 50+ programming languages",
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
    "name": "Codemurf AI Coding Assistant",
    "description": "AI-powered online code editor and compiler with intelligent code completion, debugging, and support for 50+ programming languages including Java, Python, JavaScript",
    "url": "https://codemurf.com",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Web Browser",
    "browserRequirements": "Requires JavaScript, modern web browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free online coding assistant with premium features available"
    },
    "creator": {
      "@type": "Organization",
      "name": "Codemurf"
    },
    "featureList": [
      "AI-powered code completion",
      "50+ programming languages support",
      "Real-time collaboration",
      "Online code compiler",
      "Debugging tools",
      "Code generation",
      "Smart error detection"
    ],
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

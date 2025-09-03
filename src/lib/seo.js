/**
 * SEO utility functions for generating consistent metadata across pages
 */

const DEFAULT_METADATA = {
  siteName: 'CodeMurf',
  siteUrl: 'https://codemurf.com',
  defaultTitle: 'CodeMurf - AI-Powered Development Platform',
  defaultDescription: 'Transform your development workflow with CodeMurf\'s AI-powered tools. Build, deploy, and scale applications faster with intelligent code generation and automation.',
  defaultKeywords: 'AI development, code generation, automation, software development, programming tools, CodeMurf',
  twitterHandle: '@codemurf',
  defaultImage: '/og-image.png',
};

/**
 * Generate page metadata with SEO optimizations
 * @param {Object} options - Page-specific metadata options
 * @returns {Object} Next.js metadata object
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  path = '',
  image,
  type = 'website',
  noIndex = false,
  customData = {}
}) {
  const fullTitle = title 
    ? `${title} | ${DEFAULT_METADATA.siteName}`
    : DEFAULT_METADATA.defaultTitle;
  
  const fullDescription = description || DEFAULT_METADATA.defaultDescription;
  const fullKeywords = [...DEFAULT_METADATA.defaultKeywords.split(', '), ...keywords].join(', ');
  const fullUrl = `${DEFAULT_METADATA.siteUrl}${path}`;
  const fullImage = image || DEFAULT_METADATA.defaultImage;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: DEFAULT_METADATA.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
          type: 'image/png',
        },
      ],
      locale: 'en_US',
      type: type,
    },
    
    // Twitter
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: DEFAULT_METADATA.twitterHandle,
      site: DEFAULT_METADATA.twitterHandle,
    },
    
    // Robots
    robots: {
      index: !noIndex,
      follow: !noIndex,
      nocache: false,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    // Canonical URL
    alternates: {
      canonical: path || '/',
    },
    
    // Custom metadata
    ...customData,
  };
}

/**
 * Generate JSON-LD structured data for pages
 */
export function generatePageStructuredData({
  type = 'WebPage',
  name,
  description,
  url,
  breadcrumbs = [],
  customData = {}
}) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    name: name || DEFAULT_METADATA.defaultTitle,
    description: description || DEFAULT_METADATA.defaultDescription,
    url: url || DEFAULT_METADATA.siteUrl,
    isPartOf: {
      '@type': 'WebSite',
      name: DEFAULT_METADATA.siteName,
      url: DEFAULT_METADATA.siteUrl,
    },
  };

  if (breadcrumbs.length > 0) {
    baseData.breadcrumb = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  }

  return { ...baseData, ...customData };
}

/**
 * Generate article structured data for blog posts
 */
export function generateArticleStructuredData({
  headline,
  description,
  author,
  datePublished,
  dateModified,
  url,
  image,
  category = 'Technology'
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    author: {
      '@type': 'Person',
      name: author || 'CodeMurf Team',
    },
    publisher: {
      '@type': 'Organization',
      name: DEFAULT_METADATA.siteName,
      logo: {
        '@type': 'ImageObject',
        url: `${DEFAULT_METADATA.siteUrl}/logo.svg`,
      },
    },
    datePublished,
    dateModified: dateModified || datePublished,
    url,
    image: image || DEFAULT_METADATA.defaultImage,
    articleSection: category,
    inLanguage: 'en-US',
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQStructuredData(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

const seoUtils = {
  generateMetadata,
  generatePageStructuredData,
  generateArticleStructuredData,
  generateFAQStructuredData,
  DEFAULT_METADATA,
};

export default seoUtils;


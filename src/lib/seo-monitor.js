/**
 * Performance and SEO monitoring utilities
 */

// Web Vitals tracking for SEO
export function trackWebVitals() {
  if (typeof window !== 'undefined') {
    // Track Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(console.log);
      getFID(console.log);
      getFCP(console.log);
      getLCP(console.log);
      getTTFB(console.log);
    });
  }
}

// SEO performance insights
export function logSEOMetrics() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Check for missing alt attributes
    const images = document.querySelectorAll('img:not([alt])');
    if (images.length > 0) {
      console.warn('🚨 SEO Warning: Found images without alt attributes:', images);
    }

    // Check for missing meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      console.warn('🚨 SEO Warning: Missing meta description');
    }

    // Check for missing title
    if (!document.title || document.title.length < 10) {
      console.warn('🚨 SEO Warning: Title too short or missing');
    }

    // Check for missing h1
    const h1 = document.querySelector('h1');
    if (!h1) {
      console.warn('🚨 SEO Warning: Missing H1 tag');
    }

    // Check for multiple h1 tags
    const h1s = document.querySelectorAll('h1');
    if (h1s.length > 1) {
      console.warn('🚨 SEO Warning: Multiple H1 tags found');
    }

    console.log('✅ SEO metrics checked');
  }
}

// Accessibility checks for better SEO
export function checkAccessibility() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    // Check for missing lang attribute
    if (!document.documentElement.lang) {
      console.warn('🚨 A11y Warning: Missing lang attribute on html element');
    }

    // Check for links without text
    const emptyLinks = document.querySelectorAll('a:not([aria-label]):empty');
    if (emptyLinks.length > 0) {
      console.warn('🚨 A11y Warning: Found links without text or aria-label');
    }

    // Check for buttons without text
    const emptyButtons = document.querySelectorAll('button:not([aria-label]):empty');
    if (emptyButtons.length > 0) {
      console.warn('🚨 A11y Warning: Found buttons without text or aria-label');
    }

    console.log('✅ Accessibility checks completed');
  }
}

// Initialize all monitoring
export function initSEOMonitoring() {
  if (typeof window !== 'undefined') {
    // Run checks after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        logSEOMetrics();
        checkAccessibility();
        trackWebVitals();
      }, 1000);
    });
  }
}

const seoMonitor = {
  trackWebVitals,
  logSEOMetrics,
  checkAccessibility,
  initSEOMonitoring,
};

export default seoMonitor;


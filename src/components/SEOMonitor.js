'use client';

import { useEffect } from 'react';

export default function SEOMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Dynamically import the SEO monitor module
      import('../lib/seo-monitor.js')
        .then(({ initSEOMonitoring }) => {
          initSEOMonitoring();
        })
        .catch((error) => {
          console.warn('Failed to load SEO monitoring (non-critical):', error);
        });
    }
  }, []);

  return null; // This component doesn't render anything
}
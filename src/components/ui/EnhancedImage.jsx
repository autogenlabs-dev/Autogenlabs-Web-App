'use client';
import { useState } from 'react';
import Image from 'next/image';
import { enhanceImageProps } from '../lib/imageHelpers';

/**
 * Enhanced Image component with better error handling for external images
 * Provides fallbacks for common image loading issues (403, 404, etc.)
 */
const EnhancedImage = ({ src, alt, onError, ...props }) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const handleError = (e) => {
    // Try once more with enhanced props
    if (retryCount === 0) {
      setRetryCount(1);
      return;
    }
    
    setHasError(true);
    onError?.(e);
  };

  const handleLoad = (e) => {
    setHasError(false);
    setRetryCount(0);
    props.onLoad?.(e);
  };

  // Use enhanced props for potentially problematic images
  const enhancedProps = enhanceImageProps({ src, ...props });

  if (hasError) {
    // Fallback UI for failed images
    return (
      <div 
        className={`bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${props.className}`}
        style={props.style}
      >
        <div className="text-center text-white p-4">
          <div className="w-8 h-8 mx-auto mb-2 opacity-60">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenOdd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenOdd" />
            </svg>
          </div>
          <p className="text-xs opacity-80">Image unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <Image
      {...enhancedProps}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      key={`${src}-${retryCount}`} // Force re-render on retry
    />
  );
};

export default EnhancedImage;

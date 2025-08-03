'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

/**
 * SafeImage component that automatically handles positioning issues with fill prop
 * and provides better error handling for external images
 */
const SafeImage = ({ 
  src, 
  alt, 
  fill = false, 
  className = '', 
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  quality = 80,
  onLoad,
  onError,
  style = {},
  ...props 
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  // Check if parent has proper positioning when using fill
  useEffect(() => {
    if (fill && containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const computedStyle = window.getComputedStyle(parent);
        const position = computedStyle.position;
        
        if (position === 'static') {
          parent.style.position = 'relative';
        }
      }
    }
  }, [fill, src, alt]);

  const handleLoad = (e) => {
    setIsLoading(false);
    setHasError(false);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(e);
  };

  // Fallback component for failed images
  if (hasError) {
    return (
      <div 
        ref={containerRef}
        className={`bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0, ...style } : style}
      >
        <div className="text-center text-white p-2">
          <div className="w-6 h-6 mx-auto mb-1 opacity-60">
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
    <div ref={containerRef} className={fill ? "contents" : ""}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        className={className}
        priority={priority}
        sizes={sizes}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        style={style}
        {...props}
      />
    </div>
  );
};

export default SafeImage;

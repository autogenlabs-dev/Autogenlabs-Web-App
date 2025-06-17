'use client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  lazy = true,
  fallback = null,
  placeholder = 'blur',
  quality = 80,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  onLoad,
  onError,
  style = {},
  fill = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px', // Start loading 50px before visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority, isInView]);

  // Handle image load
  const handleLoad = (e) => {
    setIsLoaded(true);
    onLoad?.(e);
  };
  // Handle image error
  const handleError = (e) => {
    setHasError(true);
    onError?.(e);
    
    // Log warning for external image failures
    if (src && src.startsWith('https://images.unsplash.com')) {
      console.warn(`Failed to load optimized image: ${src}. This might be due to rate limiting or access restrictions.`);
    }
  };

  // Generate optimized blur placeholder
  const blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAX/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==";

  // Fallback component
  const FallbackComponent = fallback || (() => (
    <div 
      className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
      style={{ width, height, ...style }}
    >
      <div className="w-8 h-8 bg-gray-300 rounded"></div>
    </div>
  ));

  // Error component
  const ErrorComponent = () => (
    <div 
      className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center ${className}`}
      style={{ width, height, ...style }}
    >
      <div className="text-center p-4">
        <div className="w-8 h-8 mx-auto mb-2 text-gray-400">
          <svg fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="text-xs text-gray-500">Failed to load</p>
      </div>
    </div>
  );

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={fill ? {} : { width, height, ...style }}
    >
      {/* Show fallback while not in view or loading */}
      {(!isInView || (!isLoaded && !hasError)) && !hasError && (
        <div className="absolute inset-0 z-10">
          <FallbackComponent />
        </div>
      )}

      {/* Show error component if image failed */}
      {hasError && (
        <div className="absolute inset-0 z-10">
          <ErrorComponent />
        </div>
      )}

      {/* Actual optimized image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          className={`transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          priority={priority}
          loading={priority ? 'eager' : 'lazy'}
          quality={quality}
          sizes={sizes}
          placeholder={placeholder}
          blurDataURL={placeholder === 'blur' ? blurDataURL : undefined}
          onLoad={handleLoad}
          onError={handleError}
          style={fill ? { objectFit: 'cover', ...style } : style}
          {...props}
        />
      )}

      {/* Loading overlay */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse z-5">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </div>
  );
};

// Specialized image components for common use cases
export const HeroImage = (props) => (
  <OptimizedImage
    priority={true}
    lazy={false}
    quality={90}
    sizes="100vw"
    {...props}
  />
);

export const GalleryImage = (props) => (
  <OptimizedImage
    priority={false}
    lazy={true}
    quality={80}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
    {...props}
  />
);

export const ThumbnailImage = (props) => (
  <OptimizedImage
    priority={false}
    lazy={true}
    quality={75}
    sizes="(max-width: 768px) 50vw, 25vw"
    {...props}
  />
);

export const LogoImage = (props) => (
  <OptimizedImage
    priority={false}
    lazy={true}
    quality={85}
    sizes="(max-width: 768px) 20vw, 10vw"
    {...props}
  />
);

export default OptimizedImage;
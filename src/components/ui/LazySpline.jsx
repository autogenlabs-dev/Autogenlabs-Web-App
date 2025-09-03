'use client';
import { useState, useEffect, useRef } from 'react';

const LazySpline = ({ 
  src, 
  fallback = null, 
  delay = 2000, 
  className = "", 
  style = {},
  title = "3D Scene",
  intersectionDelay = 0 
}) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Intersection Observer for viewport detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px', // Start loading 100px before visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Delayed loading after intersection
  useEffect(() => {
    if (isInView && !shouldLoad) {
      const timer = setTimeout(() => {
        setShouldLoad(true);
      }, intersectionDelay);

      return () => clearTimeout(timer);
    }
  }, [isInView, shouldLoad, intersectionDelay]);

  // Global delay (for non-critical Spline scenes)
  useEffect(() => {
    if (delay > 0) {
      const globalTimer = setTimeout(() => {
        setShouldLoad(true);
      }, delay);

      return () => clearTimeout(globalTimer);
    }
  }, [delay]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`} style={style}>
      {/* Fallback while loading */}
      {!isLoaded && fallback}
      
      {/* Loading indicator */}
      {shouldLoad && !isLoaded && !fallback && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-lg">
          <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Actual Spline iframe */}
      {shouldLoad && (
        <iframe
          src={src}
          frameBorder="0"
          width="100%"
          height="100%"
          className={`pointer-events-none transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            ...style,
          }}
          title={title}
          onLoad={handleLoad}
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazySpline;

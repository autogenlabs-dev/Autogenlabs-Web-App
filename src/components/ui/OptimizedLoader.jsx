'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Optimized component that loads immediately but animates smoothly
export const OptimizedComponent = ({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}) => {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after specified delay
    const timer = setTimeout(() => {
      setShouldAnimate(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={shouldAnimate ? { 
          opacity: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          y: 30 
        }}
        transition={{ 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing for smooth animation
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Preloaded component that's invisible until animated
export const PreloadedComponent = ({ 
  children, 
  delay = 0,
  className = "",
  ...props 
}) => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Show content after delay
    const timer = setTimeout(() => {
      setShouldShow(true);
    }, delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div className={className} {...props}>
      {/* Content is always loaded, just visibility controlled */}
      <motion.div
        style={{ 
          visibility: shouldShow ? 'visible' : 'hidden',
          height: shouldShow ? 'auto' : '0',
          overflow: shouldShow ? 'visible' : 'hidden'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={shouldShow ? { 
          opacity: 1, 
          y: 0 
        } : { 
          opacity: 0, 
          y: 20 
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Staggered animation for multiple components
export const StaggeredContainer = ({ children, staggerDelay = 100 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: staggerDelay / 1000
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredItem = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Fast loading component with minimal delay
export const FastLoader = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default OptimizedComponent;


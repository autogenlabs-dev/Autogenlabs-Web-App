/**
 * Development utility to automatically fix positioning issues with Next.js Image fill prop
 * This should only be used in development to identify and fix positioning issues
 */

export const fixImagePositioning = () => {
  if (process.env.NODE_ENV !== 'development') return;

  // Wait for DOM to be ready
  if (typeof window === 'undefined') return;

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          // Find all images with position: absolute (fill prop creates these)
          const fillImages = node.querySelectorAll?.('img[style*="position: absolute"]') || [];
          
          fillImages.forEach((img) => {
            const parent = img.parentElement;
            if (parent) {
              const computedStyle = window.getComputedStyle(parent);
              
              if (computedStyle.position === 'static') {
                console.warn(
                  'Auto-fixing static positioning for fill image parent:', 
                  { 
                    imgSrc: img.src, 
                    parentElement: parent.tagName,
                    parentClass: parent.className 
                  }
                );
                parent.style.position = 'relative';
              }
            }
          });
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Cleanup function
  return () => observer.disconnect();
};

// Auto-run in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  document.addEventListener('DOMContentLoaded', fixImagePositioning);
  
  // Also run after a delay to catch dynamically loaded images
  setTimeout(fixImagePositioning, 1000);
}

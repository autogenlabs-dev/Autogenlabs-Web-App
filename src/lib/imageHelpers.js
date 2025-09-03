// Temporary workaround for external image loading issues
// This configuration helps with Unsplash API rate limiting and access issues

// Common Unsplash image IDs that can be problematic
const PROBLEMATIC_UNSPLASH_IDS = [
  'photo-1494790108755-2616b612b786',
  'photo-1507003211169-0a1dd7228f2d',
  'photo-1556075798-4825dfaaf498',
  'photo-1618477388954-7852f32655ec',
  'photo-1558494949-ef010cbdcc31',
  'photo-1544383835-bda2bc66a55d',
  'photo-1551808525-51a94da548ce',
  'photo-1486312338219-ce68d2c6f44d',
  'photo-1454165804606-c3d57bc86b40'
];

// Generate placeholder images for development
export const generatePlaceholder = (width = 600, height = 400, seed = 'default') => {
  return `https://picsum.photos/seed/${seed}/${width}/${height}`;
};

// Check if an Unsplash URL is potentially problematic
export const isProblematicUnsplashUrl = (url) => {
  if (!url || !url.includes('images.unsplash.com')) return false;
  return PROBLEMATIC_UNSPLASH_IDS.some(id => url.includes(id));
};

// Convert problematic Unsplash URLs to Picsum alternatives
export const getAlternativeImageUrl = (originalUrl) => {
  if (!isProblematicUnsplashUrl(originalUrl)) return originalUrl;
  
  // Extract dimensions from URL if possible
  const widthMatch = originalUrl.match(/w=(\d+)/);
  const heightMatch = originalUrl.match(/h=(\d+)/);
  
  const width = widthMatch ? parseInt(widthMatch[1]) : 600;
  const height = heightMatch ? parseInt(heightMatch[1]) : 400;
  
  // Generate a seed based on the original URL for consistency
  const seed = originalUrl.split('/').pop()?.split('?')[0] || 'fallback';
  
  return generatePlaceholder(width, height, seed);
};

// Enhanced image props with fallback handling
export const enhanceImageProps = (props) => {
  const { src, ...rest } = props;
  
  if (isProblematicUnsplashUrl(src)) {
    console.warn(`Using alternative image for potentially problematic URL: ${src}`);
    return {
      ...rest,
      src: getAlternativeImageUrl(src),
      // Add unoptimized flag for external images if they continue to fail
      unoptimized: false
    };
  }
  
  return props;
};


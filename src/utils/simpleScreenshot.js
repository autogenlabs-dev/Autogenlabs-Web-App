/**
 * Simple screenshot utility that works without API keys
 */

export const getWorkingScreenshotUrl = (url, options = {}) => {
    const { width = 800, height = 600 } = options;
    
    try {
        // Validate URL
        new URL(url);
        
        // Use htmlcsstoimage.com demo service - it actually works!
        return `https://htmlcsstoimage.com/demo_images/image.png?url=${encodeURIComponent(url)}&width=${width}&height=${height}`;
        
    } catch (error) {
        console.error('Invalid URL for screenshot:', url);
        return null;
    }
};

export const getFaviconUrl = (url) => {
    try {
        const domain = new URL(url).hostname;
        return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
        return 'https://www.google.com/s2/favicons?domain=example.com&sz=64';
    }
};

export const getDomainName = (url) => {
    try {
        return new URL(url).hostname.replace('www.', '');
    } catch {
        return 'Website';
    }
};


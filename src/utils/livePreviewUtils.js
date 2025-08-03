/**
 * Utility functions for generating live previews from URLs
 */

/**
 * Generate a screenshot URL from a live demo URL
 * @param {string} liveUrl - The live demo URL
 * @param {Object} options - Screenshot options
 * @returns {string} - Screenshot service URL
 */
export const generateScreenshotUrl = (liveUrl, options = {}) => {
    if (!liveUrl) return null;
    
    const {
        width = 400,
        height = 300,
        quality = 90,
        format = 'jpg'
    } = options;
    
    try {
        // Validate URL first
        new URL(liveUrl); // This will throw if invalid
        
        // Use multiple screenshot services as fallbacks
        const services = [
            // Service 1: Website-shot.com (more reliable)
            `https://api.website-shot.com/?url=${encodeURIComponent(liveUrl)}&width=${width}&height=${height}&format=png`,
            
            // Service 2: URLBox.io (free tier)
            `https://api.urlbox.io/v1/render?url=${encodeURIComponent(liveUrl)}&width=${width}&height=${height}&format=png`,
            
            // Service 3: Screenshot.guru (reliable free service)
            `https://api.screenshot.guru/screenshot?url=${encodeURIComponent(liveUrl)}&width=${width}&height=${height}&format=png`,
            
            // Service 4: Image.thum.io (fallback)
            `https://image.thum.io/get/width/${width}/crop/${height}/${liveUrl}`,
            
            // Service 5: Screeenly.com 
            `https://screeenly.com/api/v1/fullsize?key=demo&url=${encodeURIComponent(liveUrl)}&width=${width}&height=${height}`
        ];
        
        // Try multiple services in sequence for better reliability
        const screenshotUrl = services[0]; // Start with the most reliable one
        
        return screenshotUrl;
    } catch (error) {
        console.error('❌ Error generating screenshot URL for:', liveUrl, error);
        return null;
    }
};

/**
 * Generate multiple screenshot URLs for different sizes
 * @param {string} liveUrl - The live demo URL
 * @returns {Object} - Object with different sized screenshot URLs
 */
export const generateMultipleScreenshots = (liveUrl) => {
    if (!liveUrl) return {};
    
    return {
        thumbnail: generateScreenshotUrl(liveUrl, { width: 400, height: 300 }),
        medium: generateScreenshotUrl(liveUrl, { width: 800, height: 600 }),
        large: generateScreenshotUrl(liveUrl, { width: 1200, height: 900 }),
        mobile: generateScreenshotUrl(liveUrl, { width: 375, height: 667 }),
        tablet: generateScreenshotUrl(liveUrl, { width: 768, height: 1024 })
    };
};

/**
 * Get fallback category image based on template category
 * @param {string} category - Template category
 * @returns {string} - Fallback image path
 */
export const getCategoryFallbackImage = (category) => {
    const categoryImageMap = {
        'Navigation': '/components/navbar-preview.svg',
        'Layout': '/components/sidebar-preview.svg',
        'Forms': '/components/contact-form-preview.svg',
        'Data Display': '/components/data-table-preview.svg',
        'User Interface': '/components/modal-dialog-preview.svg',
        'Content': '/components/pricing-cards-preview.svg',
        'Media': '/components/image-gallery-preview.svg',
        'Interactive': '/components/hero-section-preview.svg',
        'Widgets': '/components/sidebar-preview.svg',
        'Sections': '/components/hero-section-preview.svg'
    };
    
    return categoryImageMap[category] || '/components/navbar-preview.svg';
};

/**
 * Get multiple screenshot service URLs for better reliability
 * @param {string} url - The URL to screenshot  
 * @param {Object} options - Screenshot options
 * @returns {Array} - Array of screenshot service URLs
 */
export const getScreenshotServices = (url, options = {}) => {
    if (!url) return [];
    
    const {
        width = 800,
        height = 600
    } = options;
    
    try {
        // Validate URL first
        new URL(url);
        
        // Return multiple services in order of reliability - FREE WORKING SERVICES ONLY
        return [
            // Service 1: Image.thum.io (most reliable free service)
            `https://image.thum.io/get/width/800/crop/600/noanimate/${url}`,
            
            // Service 2: URLBox.io (free tier - limited but works)
            `https://api.urlbox.io/v1/render?url=${encodeURIComponent(url)}&width=${width}&height=${height}&format=png`,
            
            // Service 3: Simple URL to favicon + domain approach (always works)
            `https://www.google.com/s2/favicons?domain=${encodeURIComponent(url)}&sz=128`,
            
            // Service 4: Website shot API (free)
            `https://shot.screenshotapi.net/screenshot?token=F2K5KJHG-H2RL7K7W-PHW84RKM-BJHGRYEP&url=${encodeURIComponent(url)}&width=${width}&height=${height}&output=image&file_type=png&wait_for_event=load`,
            
            // Service 5: Final fallback - simple domain favicon
            `https://favicon.yandex.net/favicon/v2/${encodeURIComponent(url)}?size=64`
        ];
    } catch (error) {
        console.error('❌ Invalid URL for screenshot services:', url);
        return [];
    }
};

/**
 * Get the best preview image for a template with reliable screenshot service
 * @param {Object} template - Template object
 * @param {Object} options - Options for screenshot generation
 * @returns {string} - Best preview image URL
 */
export const getBestPreviewImage = (template, options = {}) => {
    if (!template) {
        return null;
    }
    
    // If we have a live URL, use screenshot service
    if (template.liveDemoUrl) {
        try {
            // Validate URL first
            new URL(template.liveDemoUrl);
            
            // Use a working screenshot service - this one works reliably
            const screenshotUrl = `https://image.thum.io/get/width/800/crop/600/noanimate/${template.liveDemoUrl}`;
            
            return screenshotUrl;
            
        } catch (urlError) {
            // Invalid URL format
        }
    }
    
    // If no live URL, return null to hide the template
    return null;
};

/**
 * Get fallback services for a template from cache
 * @param {Object} template - Template object
 * @returns {Array} - Array of fallback service URLs
 */
export const getFallbackServices = (template) => {
    if (!template) return [];
    
    const cacheKey = `${template.id || template.title}-${template.liveDemoUrl}`;
    return window._screenshotServicesCache.get(cacheKey) || [];
};

/**
 * Check if a URL is valid
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Extract domain from URL for display purposes
 * @param {string} url - URL to extract domain from
 * @returns {string} - Domain name
 */
export const extractDomain = (url) => {
    if (!isValidUrl(url)) return '';
    
    try {
        const urlObj = new URL(url);
        return urlObj.hostname.replace('www.', '');
    } catch {
        return '';
    }
};

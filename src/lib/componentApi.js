/**
 * Component API Service
 * Handles all component-related API calls
 */

import { tokenUtils, ApiError } from './api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const handleApiResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorDetails = null;
        
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || errorMessage;
            errorDetails = errorData;
        } catch (e) {
            // If we can't parse error response, use default message
        }
        
        throw new ApiError(errorMessage, response.status, errorDetails);
    }
    
    return await response.json();
};

// Token refresh function
const refreshAccessToken = async () => {
    const refreshToken = tokenUtils.getRefreshToken();
    if (!refreshToken) {
        throw new ApiError('No refresh token available', 401);
    }

    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        tokenUtils.clearTokens(); // Clear invalid tokens
        throw new ApiError('Token refresh failed - please login again', 401);
    }

    const data = await response.json();
    tokenUtils.setTokens(data.access_token, data.refresh_token);
    return data.access_token;
};

// Enhanced auth headers with automatic token refresh
const getAuthHeadersWithRefresh = async () => {
    if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
    
    let token = tokenUtils.getAccessToken();
    
    // Check if token is expired and refresh if needed
    if (!token || tokenUtils.isTokenExpired(token)) {
        const refreshToken = tokenUtils.getRefreshToken();
        
        try {
            token = await refreshAccessToken();
        } catch (error) {
            tokenUtils.clearTokens();
            throw new ApiError('Authentication required - please login again', 401);
        }
    }
    
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const componentApi = {
    /**
     * Convert File object to compressed data URL
     */
    fileToDataURL(file) {
        return new Promise((resolve, reject) => {
            // Check if file is an image
            if (!file.type.startsWith('image/')) {
                reject(new Error('File is not an image'));
                return;
            }
            
            // Create canvas for image compression
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = () => {
                // Set maximum dimensions for component preview
                const maxWidth = 400;
                const maxHeight = 300;
                
                let { width, height } = img;
                
                // Calculate new dimensions maintaining aspect ratio
                if (width > height) {
                    if (width > maxWidth) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                
                // Set canvas dimensions
                canvas.width = width;
                canvas.height = height;
                
                // Draw and compress image
                ctx.drawImage(img, 0, 0, width, height);
                
                // Convert to data URL with compression (JPEG, 70% quality)
                const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
                resolve(dataUrl);
                
                // Clean up object URL
                URL.revokeObjectURL(img.src);
            };
            
            img.onerror = () => {
                URL.revokeObjectURL(img.src);
                reject(new Error('Failed to load image'));
            };
            
            // Create object URL for the image
            img.src = URL.createObjectURL(file);
        });
    },

    /**
     * Create a new component
     */
    async createComponent(componentData) {
        try {
            // Use basic headers - NO AUTHENTICATION REQUIRED AT ALL
            const headers = {
                'Content-Type': 'application/json'
            };
            
            const response = await fetch(`${API_BASE_URL}/components`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(componentData),
            });

            const result = await handleApiResponse(response);
            
            // Transform the response to ensure ID is a string
            return this.transformComponentData(result);
        } catch (error) {
            // Pass through the exact error without any transformation
            throw error;
        }
    },

    /**
     * Get all components with optional filtering
     */
    async getComponents({
        skip = null,
        limit = null,
        category = null,
        type = null,
        plan_type = null,
        featured = null,
        popular = null,
        search = null
    } = {}) {
        try {
            const params = new URLSearchParams();
            
            // Only add skip and limit if they are explicitly provided
            if (skip !== null && skip !== undefined) params.append('skip', skip.toString());
            if (limit !== null && limit !== undefined) params.append('limit', limit.toString());
            
            if (category) params.append('category', category);
            if (type) params.append('type', type);
            if (plan_type) params.append('plan_type', plan_type);
            if (featured !== null) params.append('featured', featured.toString());
            if (popular !== null) params.append('popular', popular.toString());
            if (search) params.append('search', search);

            // Create URL - only add query string if there are parameters
            const queryString = params.toString();
            const url = queryString ? `${API_BASE_URL}/components?${queryString}` : `${API_BASE_URL}/components`;

            const response = await fetch(url, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }, // No auth required for listing
            });

            return await handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get a specific component by ID
     */
    async getComponent(componentId) {
        try {
            const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }, // No auth required for single component
            });

            const result = await handleApiResponse(response);
            // Transform the response to ensure ID is a string
            return this.transformComponentData(result);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Update an existing component
     */
    async updateComponent(componentId, updateData) {
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(updateData),
            });

            const result = await handleApiResponse(response);
            // Transform the response to ensure ID is a string
            return this.transformComponentData(result);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Delete a component
     */
    async deleteComponent(componentId) {
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/components/${componentId}`, {
                method: 'DELETE',
                headers: headers,
            });

            return await handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get user's components
     */
    async getUserComponents({ skip = 0, limit = 100 } = {}) {
        try {
            const params = new URLSearchParams();
            params.append('skip', skip.toString());
            params.append('limit', limit.toString());

            const response = await fetch(`${API_BASE_URL}/components/user/my-components?${params.toString()}`, {
                method: 'GET',
                headers: await getAuthHeadersWithRefresh(),
            });

            return await handleApiResponse(response);
        } catch (error) {
            console.error('Get user components error:', error);
            throw error;
        }
    },

    /**
     * Get component categories (for dropdowns)
     */
    async getComponentCategories() {
        // Since this data is static, we can return it directly
        // But we could also make it dynamic by creating an endpoint
        return {
            categories: [
                'Navigation',
                'Layout', 
                'Forms',
                'Data Display',
                'User Interface',
                'Content',
                'Media',
                'Interactive',
                'Widgets',
                'Sections'
            ]
        };
    },

    /**
     * Transform backend component data to frontend format
     */
    transformComponentData(component) {
        
        // Ensure ID is always a string
        const componentId = component.id || component._id;
        const idString = typeof componentId === 'string' ? componentId : String(componentId);
        
        // Handle preview images with fallbacks
        let previewImages = component.preview_images || [];
        
        // If no preview images, add a default based on category
        if (!previewImages || previewImages.length === 0) {
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
            
            const defaultImage = categoryImageMap[component.category] || '/components/navbar-preview.svg';
            previewImages = [defaultImage];
        }
        
        const transformed = {
            id: idString,
            title: component.title,
            category: component.category,
            type: component.type,
            language: component.language,
            difficultyLevel: component.difficulty_level,
            planType: component.plan_type,
            pricingINR: component.pricing_inr || 0,
            pricingUSD: component.pricing_usd || 0,
            shortDescription: component.short_description,
            fullDescription: component.full_description,
            previewImages: previewImages,
            gitRepoUrl: component.git_repo_url,
            liveDemoUrl: component.live_demo_url,
            dependencies: component.dependencies || [],
            tags: component.tags || [],
            developerName: component.developer_name,
            developerExperience: component.developer_experience,
            isAvailableForDev: component.is_available_for_dev,
            featured: component.featured,
            code: component.code,
            readmeContent: component.readme_content,
            userId: component.user_id,
            createdAt: component.created_at,
            updatedAt: component.updated_at,
            // Default values for compatibility with existing frontend
            rating: 4.5, // You might want to add this to backend later
            downloads: 0, // You might want to add this to backend later
            views: 0, // You might want to add this to backend later
            likes: 0, // You might want to add this to backend later
        };
        
        return transformed;
    },

    /**
     * Transform frontend form data to backend format
     */
    async transformFormDataToBackend(formData) {
        try {
            
            // Handle preview images - convert File objects to base64 or data URLs
            let previewImages = [];
            
            if (Array.isArray(formData.previewImages)) {
                
                // Process each image
                for (let i = 0; i < formData.previewImages.length; i++) {
                    const img = formData.previewImages[i];
                    
                    if (typeof img === 'string') {
                        // Already a URL, keep it
                        previewImages.push(img);
                    } else if (img instanceof File) {
                        // Convert File to data URL
                        try {
                            const dataUrl = await this.fileToDataURL(img);
                            previewImages.push(dataUrl);
                        } catch (error) {
                            console.warn(`⚠️ Transform: Failed to convert file "${img.name}":`, error);
                        }
                    }
                }
                previewImages = previewImages.slice(0, 5); // Limit to 5 images
            }
        
        // If no images provided, add a default placeholder based on category
        if (previewImages.length === 0) {
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
            
            const defaultImage = categoryImageMap[formData.category] || '/components/navbar-preview.svg';
            previewImages = [defaultImage];
        }

        return {
            title: formData.title,
            category: formData.category,
            type: formData.type,
            language: formData.language,
            difficulty_level: formData.difficultyLevel,
            plan_type: formData.planType,
            pricing_inr: parseInt(formData.pricingINR) || 0,
            pricing_usd: parseInt(formData.pricingUSD) || 0,
            short_description: formData.shortDescription,
            full_description: formData.fullDescription,
            preview_images: previewImages,
            git_repo_url: formData.gitRepoUrl || null,
            live_demo_url: formData.liveDemoUrl || null,
            dependencies: formData.dependencies || [],
            tags: formData.tags || [],
            developer_name: formData.developerName,
            developer_experience: formData.developerExperience,
            is_available_for_dev: formData.isAvailableForDev !== undefined ? formData.isAvailableForDev : true,
            featured: formData.featured || false,
            code: formData.code || null,
            readme_content: formData.readmeContent || null,
        };
        } catch (error) {
            console.error('❌ Transform: Error transforming form data:', error);
            throw error;
        }
    }
};

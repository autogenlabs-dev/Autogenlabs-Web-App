/**
 * Template API service for template management
 */

import { ApiError } from './api';
import { useAuth } from '@clerk/nextjs';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const handleApiResponse = async (response) => {
    
    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorDetails = null;
        
        try {
            const errorData = await response.json();
            console.log('❌ Error Response Data:', errorData);
            errorMessage = errorData.detail || errorData.message || errorMessage;
            errorDetails = errorData;
        } catch (e) {
            // If we can't parse error response, use default message
            console.log('❌ Could not parse error response:', e);
        }
        
        throw new ApiError(errorMessage, response.status, errorDetails);
    }
    
    const data = await response.json();
    return data;
};

// Enhanced auth headers with Clerk authentication
const getAuthHeaders = async (token) => {
    if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };

    if (!token) {
        console.error('❌ apiTemplates: Token is missing or invalid', { token });
        throw new ApiError('Client-side: Authentication required - please login again', 401);
    }

    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

/**
 * Get authentication token from Clerk (use getAuthHeaders instead)
 */
const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token');
};

export const templateApi = {
    /**
     * Create a new template
     */
    async createTemplate(templateData, token) {
        try {
            const headers = await getAuthHeaders(token);

            const response = await fetch(`/api/templates`, {
                method: 'POST',
                headers,
                body: JSON.stringify(templateData),
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get all templates with optional filtering
     */
    async getTemplates(params = {}, token) {
        const queryParams = new URLSearchParams();
        
        // Add query parameters (only add non-null, non-undefined, non-empty values)
        if (params.skip !== undefined) queryParams.append('skip', params.skip);
        if (params.limit !== undefined) queryParams.append('limit', params.limit);
        if (params.category && params.category !== 'All') queryParams.append('category', params.category);
        if (params.type && params.type !== 'All') queryParams.append('type', params.type);
        if (params.plan_type && params.plan_type !== 'All') queryParams.append('plan_type', params.plan_type);
        
        // Only add featured if it's explicitly true or false, not null/undefined
        if (params.featured === true) queryParams.append('featured', 'true');
        if (params.featured === false) queryParams.append('featured', 'false');
        
        if (params.popular === true) queryParams.append('popular', 'true');
        if (params.popular === false) queryParams.append('popular', 'false');
        if (params.search && params.search.trim()) queryParams.append('search', params.search.trim());

        const finalUrl = `/api/templates?${queryParams}`;

        const response = await fetch(finalUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get a specific template by ID
     */
    async getTemplate(templateId, token) {
        const url = `/api/templates/${templateId}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const result = await handleApiResponse(response);
        
        // Check if the response has nested template data
        const templateData = result.template || result;
        
        // Transform the response to ensure consistent format
        const transformed = this.transformTemplateData(templateData);
        return transformed;
    },

    /**
     * Update an existing template
     */
    async updateTemplate(templateId, templateData, token) {
        try {
            const headers = await getAuthHeaders(token);

            const response = await fetch(`/api/templates/${templateId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(templateData),
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Delete a template
     */
    async deleteTemplate(templateId, token) {
        try {
            const headers = await getAuthHeaders(token);

            const response = await fetch(`/api/templates/${templateId}`, {
                method: 'DELETE',
                headers,
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get templates created by the current user
     */
    async getMyTemplates(params = {}, token) {
        try {
            const headers = await getAuthHeaders(token);

            const queryParams = new URLSearchParams();
            if (params.page !== undefined) queryParams.append('page', params.page);
            if (params.limit !== undefined) queryParams.append('limit', params.limit);
            // Support both skip and page for backward compatibility
            if (params.skip !== undefined && params.page === undefined) {
                const page = Math.floor(params.skip / (params.limit || 20)) + 1;
                queryParams.append('page', page);
            }

            const response = await fetch(`/api/templates/user/my-templates?${queryParams}`, {
                method: 'GET',
                headers,
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Toggle like status for a template
     */
    async toggleLike(templateId, token) {
        try {
            const headers = await getAuthHeaders(token);

            const response = await fetch(`/api/templates/${templateId}/like`, {
                method: 'POST',
                headers,
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Record a template download
     */
    async downloadTemplate(templateId, token) {
        try {
            const headers = await getAuthHeaders(token);

            const response = await fetch(`/api/templates/${templateId}/download`, {
                method: 'POST',
                headers,
            });

            return handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },



    /**
     * Get featured templates
     */
    async getFeaturedTemplates(limit = 10, token) {
        return this.getTemplates({ featured: true, limit });
    },

    /**
     * Get popular templates
     */
    async getPopularTemplates(limit = 10, token) {
        return this.getTemplates({ popular: true, limit });
    },

    /**
     * Get free templates
     */
    async getFreeTemplates(params = {}, token) {
        return this.getTemplates({ ...params, plan_type: 'Free' });
    },

    /**
     * Get paid templates
     */
    async getPaidTemplates(params = {}, token) {
        return this.getTemplates({ ...params, plan_type: 'Paid' });
    },

    /**
     * Search templates
     */
    async searchTemplates(searchQuery, params = {}, token) {
        return this.getTemplates({ ...params, search: searchQuery });
    },

    /**
     * Get templates by category
     */
    async getTemplatesByCategory(category, params = {}, token) {
        return this.getTemplates({ ...params, category });
    },

    /**
     * Get templates by type
     */
    async getTemplatesByType(type, params = {}, token) {
        return this.getTemplates({ ...params, type });
    },

    /**
     * Get all templates (alias for getTemplates)
     */
    async getAllTemplates(params = {}, token) {
        return this.getTemplates(params);
    },

    /**
     * Get template categories
     */
    async getTemplateCategories(token) {
        const response = await fetch(`/api/templates/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Transform template data from backend format to frontend format
     */
    transformTemplateData(template) {
        if (!template) return null;
        
        // Ensure ID is a string
        const idString = template.id ? String(template.id) : 
                        template._id ? String(template._id) : 
                        '';
        
        // Handle preview images - now mostly empty as we use live URL
        let previewImages = [];
        
        if (template.preview_images && Array.isArray(template.preview_images)) {
            previewImages = template.preview_images; // Keep existing if any
        } else if (template.previewImages && Array.isArray(template.previewImages)) {
            previewImages = template.previewImages; // Keep existing if any
        }
        
        const transformed = {
            id: idString,
            title: template.title,
            category: template.category,
            type: template.type,
            language: template.language,
            difficultyLevel: template.difficulty_level,
            planType: template.plan_type,
            shortDescription: template.short_description,
            fullDescription: template.full_description,
            previewImages: previewImages, // Keep but UI will prefer live URL
            gitRepoUrl: template.git_repo_url,
            liveDemoUrl: template.live_demo_url, // Main focus for preview
            dependencies: template.dependencies || [],
            tags: template.tags || [],
            developerName: template.developer_name,
            developerExperience: template.developer_experience,
            isAvailableForDev: template.is_available_for_dev,
            featured: template.featured,
            popular: template.popular,
            code: template.code,
            readmeContent: template.readme_content,
            userId: template.user_id,
            createdAt: template.created_at,
            updatedAt: template.updated_at,
            // Default values for compatibility with existing frontend
            rating: template.rating || 4.5,
            downloads: template.downloads || 0,
            views: template.views || 0,
            likes: template.likes || 0,
        };
        
        return transformed;
    },

    /**
     * Transform frontend form data to backend format
     */
    async transformFormDataToBackend(formData, token) {
        try {
            // No preview images processing - using live URL for preview
            let previewImages = [];

            return {
                title: formData.title,
                category: formData.category,
                type: formData.type,
                language: formData.language,
                difficulty_level: formData.difficultyLevel,
                plan_type: formData.planType,
                short_description: formData.shortDescription,
                full_description: formData.fullDescription,
                preview_images: previewImages, // Empty - using live URL for preview
                git_repo_url: formData.gitRepoUrl || null,
                live_demo_url: formData.liveDemoUrl || null,
                dependencies: formData.dependencies || [],
                tags: formData.tags || [],
                developer_name: formData.developerName,
                developer_experience: formData.developerExperience,
                is_available_for_dev: formData.isAvailableForDev !== undefined ? formData.isAvailableForDev : true,
                featured: formData.featured || false,
                popular: formData.popular || false,
                code: formData.code || null,
                readme_content: formData.readmeContent || null,
            };
        } catch (error) {
            throw error;
        }
    },

    /**
     * Get template statistics
     */
    async getTemplateStats(token) {
        const response = await fetch(`/api/templates/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    }
};

// Default export
export default templateApi;

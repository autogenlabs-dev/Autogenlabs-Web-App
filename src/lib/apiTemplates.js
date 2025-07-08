/**
 * Template API service for template management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

class ApiError extends Error {
    constructor(message, status, details = null) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.details = details;
    }
}

const handleApiResponse = async (response) => {
    console.log('🔍 API Response:', response.status, response.statusText);
    
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
    console.log('✅ Success Response Data:', data);
    return data;
};

/**
 * Get authentication token from localStorage
 */
const getAuthToken = () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token');
};

export const templateApi = {
    /**
     * Create a new template
     */
    async createTemplate(templateData) {
        console.log('🌐 API: createTemplate called with data:', templateData);
        
        const token = getAuthToken();
        console.log('🔑 API: Token retrieved:', token ? 'Present' : 'Missing');
        
        if (!token) {
            console.error('❌ API: No authentication token found');
            throw new ApiError('Authentication required', 401);
        }

        console.log('🚀 API: Making POST request to:', `${API_BASE_URL}/templates`);

        const response = await fetch(`${API_BASE_URL}/templates`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateData),
        });

        console.log('📡 API: Response received:', response.status, response.statusText);

        return handleApiResponse(response);
    },

    /**
     * Get all templates with optional filtering
     */
    async getTemplates(params = {}) {
        console.log('🔍 API: getTemplates called with params:', params);
        
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

        const finalUrl = `${API_BASE_URL}/templates?${queryParams}`;
        console.log('🌐 API: Final URL:', finalUrl);

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
    async getTemplate(templateId) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Update an existing template
     */
    async updateTemplate(templateId, templateData) {
        const token = getAuthToken();
        if (!token) {
            throw new ApiError('Authentication required', 401);
        }

        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateData),
        });

        return handleApiResponse(response);
    },

    /**
     * Delete a template
     */
    async deleteTemplate(templateId) {
        const token = getAuthToken();
        if (!token) {
            throw new ApiError('Authentication required', 401);
        }

        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get templates created by the current user
     */
    async getMyTemplates(params = {}) {
        const token = getAuthToken();
        if (!token) {
            throw new ApiError('Authentication required', 401);
        }

        const queryParams = new URLSearchParams();
        if (params.skip !== undefined) queryParams.append('skip', params.skip);
        if (params.limit !== undefined) queryParams.append('limit', params.limit);

        const response = await fetch(`${API_BASE_URL}/templates/user/my-templates?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Toggle like status for a template
     */
    async toggleLike(templateId) {
        const token = getAuthToken();
        if (!token) {
            throw new ApiError('Authentication required', 401);
        }

        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Record a template download
     */
    async downloadTemplate(templateId) {
        const token = getAuthToken();
        if (!token) {
            throw new ApiError('Authentication required', 401);
        }

        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/download`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },



    /**
     * Get featured templates
     */
    async getFeaturedTemplates(limit = 10) {
        return this.getTemplates({ featured: true, limit });
    },

    /**
     * Get popular templates
     */
    async getPopularTemplates(limit = 10) {
        return this.getTemplates({ popular: true, limit });
    },

    /**
     * Get free templates
     */
    async getFreeTemplates(params = {}) {
        return this.getTemplates({ ...params, plan_type: 'Free' });
    },

    /**
     * Get paid templates
     */
    async getPaidTemplates(params = {}) {
        return this.getTemplates({ ...params, plan_type: 'Paid' });
    },

    /**
     * Search templates
     */
    async searchTemplates(searchQuery, params = {}) {
        return this.getTemplates({ ...params, search: searchQuery });
    },

    /**
     * Get templates by category
     */
    async getTemplatesByCategory(category, params = {}) {
        return this.getTemplates({ ...params, category });
    },

    /**
     * Get templates by type
     */
    async getTemplatesByType(type, params = {}) {
        return this.getTemplates({ ...params, type });
    },

    /**
     * Get all templates (alias for getTemplates)
     */
    async getAllTemplates(params = {}) {
        return this.getTemplates(params);
    },

    /**
     * Get template categories
     */
    async getTemplateCategories() {
        const response = await fetch(`${API_BASE_URL}/templates/categories`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get template statistics
     */
    async getTemplateStats() {
        const response = await fetch(`${API_BASE_URL}/templates/stats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    }
};

export { ApiError };

// Default export
export default templateApi;
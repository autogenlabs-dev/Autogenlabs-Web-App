/**
 * Marketplace API Service
 /**
 * Comprehensive API integration for CodeMurf marketplace
 */

import { ApiError } from './api';

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
        tokenUtils.clearTokens();
        throw new ApiError('Token refresh failed - please login again', 401);
    }

    const data = await response.json();
    tokenUtils.setTokens(data.access_token, data.refresh_token);
    return data.access_token;
};

// Enhanced auth headers with Clerk authentication
const getAuthHeaders = async (token) => {
    if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };

    if (!token) {
        throw new ApiError('Authentication required - please login again', 401);
    }

    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const marketplaceApi = {
    // ==================== TEMPLATES ====================
    
    /**
     * Get all templates with filtering and pagination
     */
    async getTemplates(params = {}, token) {
        const queryString = new URLSearchParams();
        
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.category) queryString.append('category', params.category);
        if (params.difficulty) queryString.append('difficulty', params.difficulty);
        if (params.plan_type) queryString.append('plan_type', params.plan_type);
        if (params.search) queryString.append('search', params.search);
        if (params.sort_by) queryString.append('sort_by', params.sort_by);
        if (params.show_my_content !== undefined) queryString.append('show_my_content', params.show_my_content);
        
        const url = `${API_BASE_URL}/templates${queryString.toString() ? '?' + queryString.toString() : ''}`;
        
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(url, { headers });
            return await handleApiResponse(response);
        } catch (error) {
            if (error.status === 401) {
                // For public templates, try without auth
                const response = await fetch(url);
                return await handleApiResponse(response);
            }
            throw error;
        }
    },

    /**
     * Get single template by ID
     */
    async getTemplate(id, token) {
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/templates/${id}`, { headers });
            return await handleApiResponse(response);
        } catch (error) {
            if (error.status === 401) {
                // Try without auth for public access
                const response = await fetch(`${API_BASE_URL}/templates/${id}`);
                return await handleApiResponse(response);
            }
            throw error;
        }
    },

    /**
     * Create new template
     */
    async createTemplate(templateData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates`, {
            method: 'POST',
            headers,
            body: JSON.stringify(templateData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Update template
     */
    async updateTemplate(id, templateData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(templateData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Delete template
     */
    async deleteTemplate(id, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${id}`, {
            method: 'DELETE',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Like/Unlike template
     */
    async toggleTemplateLike(id, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${id}/like`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Get user's own templates
     */
    async getUserTemplates(params = {}, token) {
        const queryString = new URLSearchParams();
        
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.status_filter) queryString.append('status_filter', params.status_filter);
        
        const url = `${API_BASE_URL}/templates/user/my-templates${queryString.toString() ? '?' + queryString.toString() : ''}`;
        
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== COMPONENTS ====================
    
    /**
     * Get all components with filtering and pagination
     */
    async getComponents(params = {}, token) {
        const queryString = new URLSearchParams();
        
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.category) queryString.append('category', params.category);
        if (params.type) queryString.append('type', params.type);
        if (params.difficulty) queryString.append('difficulty', params.difficulty);
        if (params.plan_type) queryString.append('plan_type', params.plan_type);
        if (params.search) queryString.append('search', params.search);
        if (params.sort_by) queryString.append('sort_by', params.sort_by);
        if (params.show_my_content !== undefined) queryString.append('show_my_content', params.show_my_content);
        
        const url = `${API_BASE_URL}/components${queryString.toString() ? '?' + queryString.toString() : ''}`;
        
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(url, { headers });
            return await handleApiResponse(response);
        } catch (error) {
            if (error.status === 401) {
                // For public components, try without auth
                const response = await fetch(url);
                return await handleApiResponse(response);
            }
            throw error;
        }
    },

    /**
     * Get single component by ID
     */
    async getComponent(id, token) {
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/components/${id}`, { headers });
            return await handleApiResponse(response);
        } catch (error) {
            if (error.status === 401) {
                // Try without auth for public access
                const response = await fetch(`${API_BASE_URL}/components/${id}`);
                return await handleApiResponse(response);
            }
            throw error;
        }
    },

    /**
     * Create new component
     */
    async createComponent(componentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components`, {
            method: 'POST',
            headers,
            body: JSON.stringify(componentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Update component
     */
    async updateComponent(id, componentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(componentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Delete component
     */
    async deleteComponent(id, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${id}`, {
            method: 'DELETE',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Like/Unlike component
     */
    async toggleComponentLike(id, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${id}/like`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Get user's own components
     */
    async getUserComponents(params = {}, token) {
        const queryString = new URLSearchParams();
        
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.status_filter) queryString.append('status_filter', params.status_filter);
        
        const url = `${API_BASE_URL}/components/user/my-components${queryString.toString() ? '?' + queryString.toString() : ''}`;
        
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== COMMENTS & RATINGS ====================
    
    /**
     * Get template comments
     */
    async getTemplateComments(templateId, params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const url = `${API_BASE_URL}/templates/${templateId}/comments${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url);
        return await handleApiResponse(response);
    },

    /**
     * Create template comment
     */
    async createTemplateComment(templateId, commentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify(commentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get component comments
     */
    async getComponentComments(componentId, params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const url = `${API_BASE_URL}/components/${componentId}/comments${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url);
        return await handleApiResponse(response);
    },

    /**
     * Create component comment
     */
    async createComponentComment(componentId, commentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${componentId}/comments`, {
            method: 'POST',
            headers,
            body: JSON.stringify(commentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Update template comment
     */
    async updateTemplateComment(templateId, commentId, commentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/comments/${commentId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(commentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Delete template comment
     */
    async deleteTemplateComment(templateId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/comments/${commentId}`, {
            method: 'DELETE',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Update component comment
     */
    async updateComponentComment(componentId, commentId, commentData, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${componentId}/comments/${commentId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(commentData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Delete component comment
     */
    async deleteComponentComment(componentId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${componentId}/comments/${commentId}`, {
            method: 'DELETE',
            headers,
        });
        return await handleApiResponse(response);
    },

    // ==================== LIKE/DISLIKE FUNCTIONS ====================

    /**
     * Like a template comment
     */
    async likeTemplateComment(templateId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/comments/${commentId}/like`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Dislike a template comment
     */
    async dislikeTemplateComment(templateId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/comments/${commentId}/dislike`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Like a component comment
     */
    async likeComponentComment(componentId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${componentId}/comments/${commentId}/like`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Dislike a component comment
     */
    async dislikeComponentComment(componentId, commentId, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/components/${componentId}/comments/${commentId}/dislike`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Vote on comment (helpful/not helpful)
     */
    async voteComment(commentId, voteType, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/comments/${commentId}/vote`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ vote_type: voteType }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get comments for any item type
     */
    async getComments(itemId, itemType, params = {}, token) {
        if (itemType === 'template') {
            return this.getTemplateComments(itemId, params);
        } else if (itemType === 'component') {
            return this.getComponentComments(itemId, params);
        } else {
            throw new Error('Invalid item type');
        }
    },

    /**
     * Create comment for any item type
     */
    async createComment(itemId, itemType, commentData, token) {
        if (itemType === 'template') {
            return this.createTemplateComment(itemId, commentData);
        } else if (itemType === 'component') {
            return this.createComponentComment(itemId, commentData);
        } else {
            throw new Error('Invalid item type');
        }
    },

    /**
     * Update comment for any item type
     */
    async updateComment(commentId, commentData, token) {
        // Try both template and component endpoints
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
                method: 'PUT',
                headers,
                body: JSON.stringify(commentData),
            });
            return await handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    /**
     * Delete comment for any item type
     */
    async deleteComment(commentId, token) {
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
                method: 'DELETE',
                headers,
            });
            return await handleApiResponse(response);
        } catch (error) {
            throw error;
        }
    },

    // ==================== SEARCH ====================
    
    /**
     * Search templates and components
     */
    async search(query, filters = {}, token) {
        const queryString = new URLSearchParams();
        queryString.append('q', query);
        
        if (filters.type) queryString.append('type', filters.type); // 'template' or 'component'
        if (filters.category) queryString.append('category', filters.category);
        if (filters.difficulty) queryString.append('difficulty', filters.difficulty);
        if (filters.plan_type) queryString.append('plan_type', filters.plan_type);
        if (filters.limit) queryString.append('limit', filters.limit);
        
        const url = `${API_BASE_URL}/search?${queryString.toString()}`;
        
        try {
            const headers = await getAuthHeadersWithRefresh();
            const response = await fetch(url, { headers });
            return await handleApiResponse(response);
        } catch (error) {
            if (error.status === 401) {
                const response = await fetch(url);
                return await handleApiResponse(response);
            }
            throw error;
        }
    },

    // ==================== USER ANALYTICS ====================
    
    /**
     * Get user analytics data
     */
    async getUserAnalytics( token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/user/analytics`, {
            headers,
        });
        return await handleApiResponse(response);
    },

    // ==================== CATEGORIES ====================
    
    /**
     * Get template categories
     */
    async getTemplateCategories(token) {
        const response = await fetch(`${API_BASE_URL}/templates/categories`);
        return await handleApiResponse(response);
    },

    /**
     * Get component categories  
     */
    async getComponentCategories( token) {
        const response = await fetch(`${API_BASE_URL}/components/categories`);
        return await handleApiResponse(response);
    },

    // ==================== ADMIN APPROVAL ====================
    
    /**
     * Get pending approvals (Admin only)
     */
    async getPendingApprovals(params = {}, token) {
        const queryString = new URLSearchParams();
        
        if (params.content_type) queryString.append('content_type', params.content_type);
        if (params.status) queryString.append('status', params.status);
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const url = `${API_BASE_URL}/admin/approvals${queryString.toString() ? '?' + queryString.toString() : ''}`;
        
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Approve content (Admin only)
     */
    async approveContent(approvalId, adminNotes = null, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/approvals/${approvalId}/approve`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ admin_notes: adminNotes }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Reject content (Admin only)
     */
    async rejectContent(approvalId, rejectionReason, adminNotes = null, token) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/approvals/${approvalId}/reject`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ 
                rejection_reason: rejectionReason,
                admin_notes: adminNotes 
            }),
        });
        return await handleApiResponse(response);
    }
};

export { ApiError };


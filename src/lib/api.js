/**
 * API service for authentication and user management
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

export const authApi = {
    /**
     * Register a new user
     */    async signup(userData) {
        const response = await fetch(`${API_BASE_URL}/auth/register?t=${Date.now()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                first_name: userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0],
                last_name: userData.name ? (userData.name.split(' ')[1] || '') : '',
            }),
        });

        return handleApiResponse(response);
    },

    /**
     * Login user with email and password
     */    async login(email, password) {
        const response = await fetch(`${API_BASE_URL}/auth/login-json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return handleApiResponse(response);
    },

    /**
     * Refresh access token using refresh token
     */    async refreshToken(refreshToken) {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                refresh_token: refreshToken,
            }),
        });

        return handleApiResponse(response);
    },

    /**
     * Transform backend template data to ensure consistent format
     */
    transformTemplateData(template) {
        if (!template) return template;
        
        // Ensure ID is always a string for consistent usage in components
        const templateId = template.id || template._id;
        const idString = typeof templateId === 'string' ? templateId : String(templateId);
        
        return {
            ...template,
            id: idString
        };
    },

    /**
     * Get current user profile
     */    async getCurrentUser(accessToken) {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await handleApiResponse(response);
        // Backend returns { user: {...} }, so extract the user data
        return data.user || data;
    },

    /**
     * Logout user and invalidate tokens on backend
     */
    async logout(accessToken) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            // Even if the backend call fails, we should still clear local tokens
            const result = await handleApiResponse(response);
            return result;
        } catch (error) {
            console.warn('Backend logout failed, but continuing with local cleanup:', error);
            // Return success anyway since local cleanup is more important
            return { success: true, message: 'Logged out locally' };
        }
    },

    /**
     * Update user profile
     */
    async updateProfile(accessToken, profileData) {
        const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(profileData),
        });

        return handleApiResponse(response);
    }
};

/**
 * Template API functions for template management
 */
export const templateApi = {
    /**
     * Create a new template
     */
    async createTemplate(accessToken, templateData) {
        const response = await fetch(`${API_BASE_URL}/templates`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateData),
        });

        return handleApiResponse(response);
    },

    /**
     * Get all templates with optional filtering
     */
    async getAllTemplates(params = {}) {
        const queryParams = new URLSearchParams();
        
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                queryParams.append(key, params[key]);
            }
        });

        const url = `${API_BASE_URL}/templates${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url, {
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
    async getTemplateById(templateId) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Update a template
     */
    async updateTemplate(accessToken, templateId, templateData) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(templateData),
        });

        return handleApiResponse(response);
    },

    /**
     * Delete a template
     */
    async deleteTemplate(accessToken, templateId) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get user's own templates
     */
    async getMyTemplates(accessToken, params = {}) {
        const queryParams = new URLSearchParams();
        
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                queryParams.append(key, params[key]);
            }
        });

        const url = `${API_BASE_URL}/templates/user/my-templates${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        const result = await handleApiResponse(response);
        
        // Transform templates data to ensure consistent IDs
        if (result.templates && Array.isArray(result.templates)) {
            result.templates = result.templates.map(template => this.transformTemplateData(template));
        }
        
        return result;
    },

    /**
     * Like or unlike a template
     */
    async toggleTemplateLike(accessToken, templateId) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/like`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Record template download
     */
    async downloadTemplate(accessToken, templateId) {
        const response = await fetch(`${API_BASE_URL}/templates/${templateId}/download`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
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
    },
};

/**
 * Token management utilities
 */
export const tokenUtils = {
    getAccessToken() {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token');
    },

    getRefreshToken() {
        if (typeof window === 'undefined') return null;
        return localStorage.getItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token');
    },

    setTokens(accessToken, refreshToken) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token', accessToken);
        localStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token', refreshToken);
    },

    clearTokens() {
        if (typeof window === 'undefined') return;
        localStorage.removeItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token');
        localStorage.removeItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token');
    },

    isTokenExpired(token) {
        if (!token) return true;
        
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return Date.now() >= payload.exp * 1000;
        } catch (error) {
            return true;
        }
    },
};

/**
 * Admin API functions for admin dashboard
 */
export const adminApi = {
    /**
     * Get all content for admin review
     */
    async getAdminContent(accessToken, params = {}) {
        const queryParams = new URLSearchParams();
        
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
                queryParams.append(key, params[key]);
            }
        });

        const url = `${API_BASE_URL}/admin/content${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get admin analytics
     */
    async getAdminAnalytics(accessToken) {
        const response = await fetch(`${API_BASE_URL}/admin/analytics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Approve content
     */
    async approveContent(accessToken, contentId, contentType) {
        const response = await fetch(`${API_BASE_URL}/admin/content/${contentId}/approve?content_type=${contentType}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get all users for admin management
     */
    async getAdminUsers(accessToken, params = {}) {
        const queryParams = new URLSearchParams();
        
        Object.keys(params).forEach(key => {
            if (params[key] !== null && params[key] !== undefined) {
                queryParams.append(key, params[key]);
            }
        });

        const url = `${API_BASE_URL}/admin/users${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },
};

export { ApiError };
/**
 * Payment API functions for Razorpay integration
 */
export const paymentApi = {
    /**
     * Create a payment order for a subscription plan
     */
    async createOrder(accessToken, planName, amountUSD) {
        const response = await fetch(`${API_BASE_URL}/payments/create-order`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                plan_name: planName,
                amount_usd: amountUSD,
            }),
        });

        return handleApiResponse(response);
    },

    /**
     * Verify payment after successful Razorpay payment
     */
    async verifyPayment(accessToken, paymentData) {
        console.log('Making verify payment request to:', `${API_BASE_URL}/payments/verify-payment`);
        console.log('Payment data:', paymentData);
        console.log('Access token present:', !!accessToken);
        
        const response = await fetch(`${API_BASE_URL}/payments/verify-payment`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        console.log('Verify payment response status:', response.status);
        console.log('Verify payment response ok:', response.ok);
        
        return handleApiResponse(response);
    },

    /**
     * Get payment configuration
     */
    async getPaymentConfig() {
        const response = await fetch(`${API_BASE_URL}/payments/config`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get user's payment orders
     */
    async getUserOrders(accessToken) {
        const response = await fetch(`${API_BASE_URL}/payments/orders`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },

    /**
     * Get specific order details
     */
    async getOrderDetails(accessToken, orderId) {
        const response = await fetch(`${API_BASE_URL}/payments/order/${orderId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        return handleApiResponse(response);
    },
};


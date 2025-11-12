/**
 * API service for authentication and user management
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
console.log('API_BASE_URL:', API_BASE_URL);

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

// Keep authApi minimal - Clerk handles authentication
export const authApi = {
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

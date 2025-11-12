/**
 * Developer API Service
 * Handles developer dashboard, earnings, and content management
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

export const developerApi = {
    // ==================== DEVELOPER EARNINGS ====================
    
    /**
     * Get developer earnings dashboard
     */
    async getEarnings(token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/earnings`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get detailed earnings analytics
     */
    async getEarningsAnalytics(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.timeframe) queryString.append('timeframe', params.timeframe);
        if (params.start_date) queryString.append('start_date', params.start_date);
        if (params.end_date) queryString.append('end_date', params.end_date);
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/earnings/analytics${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get sales history
     */
    async getSalesHistory(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.item_type) queryString.append('item_type', params.item_type);
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/sales${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== PAYOUT MANAGEMENT ====================
    
    /**
     * Request payout
     */
    async requestPayout(payoutData, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/payout-request`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                amount_inr: payoutData.amount_inr,
                payout_method: payoutData.payout_method, // 'bank_transfer', 'upi', 'paypal'
                account_details: payoutData.account_details
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get payout history
     */
    async getPayoutHistory(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.status) queryString.append('status', params.status);
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/payouts${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== CONTENT MANAGEMENT ====================
    
    /**
     * Get developer's templates/components
     */
    async getMyContent(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.content_type) queryString.append('content_type', params.content_type);
        if (params.status) queryString.append('status', params.status);
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/content${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get content performance analytics
     */
    async getContentAnalytics(contentId, contentType, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/content/${contentId}/analytics?type=${contentType}`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Update content pricing
     */
    async updateContentPricing(contentId, contentType, pricingData, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/content/${contentId}/pricing`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                content_type: contentType,
                pricing_inr: pricingData.pricing_inr,
                pricing_usd: pricingData.pricing_usd,
                plan_type: pricingData.plan_type
            }),
        });
        return await handleApiResponse(response);
    },

    // ==================== DEVELOPER PROFILE ====================
    
    /**
     * Get developer profile
     */
    async getProfile(token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/profile`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Update developer profile
     */
    async updateProfile(profileData, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/profile`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(profileData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Update payment details
     */
    async updatePaymentDetails(paymentDetails, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/payment-details`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(paymentDetails),
        });
        return await handleApiResponse(response);
    },

    // ==================== SUBMISSION & APPROVAL ====================
    
    /**
     * Submit content for approval
     */
    async submitForApproval(contentId, contentType, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/content/${contentId}/submit`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                content_type: contentType
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get submission status
     */
    async getSubmissionStatus(contentId, contentType, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/content/${contentId}/status?type=${contentType}`, { headers });
        return await handleApiResponse(response);
    },

    // ==================== DEVELOPER DASHBOARD OVERVIEW ====================
    
    /**
     * Get complete developer dashboard data
     */
    async getDashboardOverview(token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/dashboard`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get recent activities
     */
    async getRecentActivities(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.limit) queryString.append('limit', params.limit);
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/activities${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== NOTIFICATIONS ====================
    
    /**
     * Get developer notifications
     */
    async getNotifications(params = {}, token) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.unread_only) queryString.append('unread_only', 'true');
        
        const headers = await getAuthHeaders(token);
        const url = `${API_BASE_URL}/developer/notifications${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Mark notification as read
     */
    async markNotificationRead(notificationId, token) {
        const headers = await getAuthHeaders(token);
        const response = await fetch(`${API_BASE_URL}/developer/notifications/${notificationId}/read`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    }
};

export { ApiError };


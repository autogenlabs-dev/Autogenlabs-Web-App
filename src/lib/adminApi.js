/**
 * Admin API Service
 * Handles admin dashboard and management functionality
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

// Enhanced auth headers with automatic token refresh
const getAuthHeadersWithRefresh = async () => {
    if (typeof window === 'undefined') return { 'Content-Type': 'application/json' };
    
    const token = tokenUtils.getAccessToken();
    
    if (!token || tokenUtils.isTokenExpired(token)) {
        throw new ApiError('Authentication required - please login again', 401);
    }
    
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const adminApi = {
    // ==================== USER MANAGEMENT ====================
    
    /**
     * Get all users with filtering and pagination
     */
    async getUsers(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.role) queryString.append('role', params.role);
        if (params.search) queryString.append('search', params.search);
        if (params.is_active !== undefined) queryString.append('is_active', params.is_active);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/users${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get single user details
     */
    async getUser(userId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Update user role or status
     */
    async updateUser(userId, updateData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updateData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Deactivate/Activate user
     */
    async toggleUserStatus(userId, isActive) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/status`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ is_active: isActive }),
        });
        return await handleApiResponse(response);
    },

    // ==================== DEVELOPER MANAGEMENT ====================
    
    /**
     * Get all developers with analytics
     */
    async getDevelopers(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.sort_by) queryString.append('sort_by', params.sort_by);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/developers${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get developer details with earnings
     */
    async getDeveloper(developerId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/developers/${developerId}`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Approve/Reject developer verification
     */
    async updateDeveloperVerification(developerId, status, notes = '') {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/developers/${developerId}/verification`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({
                verification_status: status,
                verification_notes: notes
            }),
        });
        return await handleApiResponse(response);
    },

    // ==================== CONTENT APPROVAL ====================
    
    /**
     * Get all content (templates and components) for admin management
     */
    async getContent(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.content_type) queryString.append('content_type', params.content_type);
        if (params.status) queryString.append('status', params.status);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/content${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },
    
    /**
     * Get pending content for approval
     */
    async getPendingContent(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.content_type) queryString.append('content_type', params.content_type);
        if (params.priority) queryString.append('priority', params.priority);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/content/pending${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Approve content
     */
    async approveContent(contentId, approvalData = {}) {
        const headers = await getAuthHeadersWithRefresh();
        const queryString = new URLSearchParams();
        queryString.append('content_type', approvalData.content_type || 'template');
        
        const response = await fetch(`${API_BASE_URL}/admin/content/${contentId}/approve?${queryString.toString()}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(approvalData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Manage user (suspend, activate, etc.)
     */
    async manageUser(userId, actionData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/manage`, {
            method: 'POST',
            headers,
            body: JSON.stringify(actionData),
        });
        return await handleApiResponse(response);
    },

    /**
     * Delete user (admin action)
     */
    async deleteUser(userId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
            method: 'DELETE',
            headers
        });
        return await handleApiResponse(response);
    },

    /**
     * Update user role or other details
     */
    async updateUserRole(userId, role) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ role }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Suspend user
     */
    async suspendUser(userId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/manage`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ action: 'suspend' }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Activate user
     */
    async activateUser(userId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/users/${userId}/manage`, {
            method: 'POST',
            headers,
            body: JSON.stringify({ action: 'activate' }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Reject content
     */
    async rejectContent(contentId, contentType, reason) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/content/reject/${contentId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                content_type: contentType,
                rejection_reason: reason
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get content approval history
     */
    async getApprovalHistory(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.status) queryString.append('status', params.status);
        if (params.reviewer_id) queryString.append('reviewer_id', params.reviewer_id);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/content/history${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== ANALYTICS & REPORTING ====================
    
    /**
     * Get platform analytics
     */
    async getAnalytics(params = {}) {
        const queryString = new URLSearchParams();
        if (params.timeframe) queryString.append('timeframe', params.timeframe);
        if (params.start_date) queryString.append('start_date', params.start_date);
        if (params.end_date) queryString.append('end_date', params.end_date);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/analytics${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get revenue analytics
     */
    async getRevenueAnalytics(params = {}) {
        const queryString = new URLSearchParams();
        if (params.timeframe) queryString.append('timeframe', params.timeframe);
        if (params.breakdown_by) queryString.append('breakdown_by', params.breakdown_by);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/revenue${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get content performance analytics
     */
    async getContentAnalytics(params = {}) {
        const queryString = new URLSearchParams();
        if (params.timeframe) queryString.append('timeframe', params.timeframe);
        if (params.content_type) queryString.append('content_type', params.content_type);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/content/analytics${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== PAYOUT MANAGEMENT ====================
    
    /**
     * Get pending payouts
     */
    async getPendingPayouts(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/payouts/pending${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Approve payout
     */
    async approvePayout(payoutId, notes = '') {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/payouts/${payoutId}/approve`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                approval_notes: notes
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Reject payout
     */
    async rejectPayout(payoutId, reason) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/payouts/${payoutId}/reject`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                rejection_reason: reason
            }),
        });
        return await handleApiResponse(response);
    },

    // ==================== COMMENT MODERATION ====================
    
    /**
     * Get reported comments
     */
    async getReportedComments(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/comments/reported${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get pending comments
     */
    async getPendingComments(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/comments/pending${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Approve comment
     */
    async approveComment(commentId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/comments/approve/${commentId}`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Reject/Hide comment
     */
    async rejectComment(commentId, reason) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/comments/reject/${commentId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                rejection_reason: reason
            }),
        });
        return await handleApiResponse(response);
    },

    // ==================== AUDIT LOGS ====================
    
    /**
     * Get audit logs
     */
    async getAuditLogs(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.action_type) queryString.append('action_type', params.action_type);
        if (params.actor_id) queryString.append('actor_id', params.actor_id);
        if (params.start_date) queryString.append('start_date', params.start_date);
        if (params.end_date) queryString.append('end_date', params.end_date);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/admin/audit-logs${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    // ==================== SYSTEM SETTINGS ====================
    
    /**
     * Get platform settings
     */
    async getSettings() {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/settings`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Update platform settings
     */
    async updateSettings(settingsData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/settings`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(settingsData),
        });
        return await handleApiResponse(response);
    },

    // ==================== DASHBOARD OVERVIEW ====================
    
    /**
     * Get admin dashboard overview
     */
    async getDashboardOverview() {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/dashboard`, { headers });
        return await handleApiResponse(response);
    },

    // ==================== CONTENT APPROVAL ====================
    
    /**
     * Approve content (template or component)
     */
    async approveContent(contentId, data = {}) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/admin/content/approve/${contentId}`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                action: 'approve',
                reason: data.reason || 'Approved via admin dashboard',
                admin_notes: data.admin_notes || ''
            })
        });
        return await handleApiResponse(response);
    }
};

export { ApiError };

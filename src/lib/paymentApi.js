/**
 * Payment API Service
 * Handles Razorpay integration and marketplace payments
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

export const paymentApi = {
    // ==================== PAYMENT CONFIGURATION ====================
    
    /**
     * Get Razorpay configuration
     */
    async getPaymentConfig() {
        const response = await fetch(`${API_BASE_URL}/payments/config`);
        return await handleApiResponse(response);
    },

    // ==================== INDIVIDUAL ITEM PURCHASE ====================
    
    /**
     * Create Razorpay order for individual item
     */
    async createItemOrder(itemData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/payments/create-item-order`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                item_id: itemData.item_id,
                item_type: itemData.item_type, // 'template' or 'component'
                price_inr: itemData.price_inr
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Verify individual item purchase
     */
    async verifyItemPurchase(paymentData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/payments/verify-item-purchase`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                razorpay_payment_id: paymentData.razorpay_payment_id,
                razorpay_order_id: paymentData.razorpay_order_id,
                razorpay_signature: paymentData.razorpay_signature,
                item_id: paymentData.item_id,
                item_type: paymentData.item_type
            }),
        });
        return await handleApiResponse(response);
    },

    // ==================== SHOPPING CART ====================
    
    /**
     * Add item to cart
     */
    async addToCart(itemData) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/cart/add`, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                item_id: itemData.item_id,
                item_type: itemData.item_type,
                price_inr: itemData.price_inr
            }),
        });
        return await handleApiResponse(response);
    },

    /**
     * Get user's cart
     */
    async getCart() {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/cart`, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Remove item from cart
     */
    async removeFromCart(itemId) {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/cart/item/${itemId}`, {
            method: 'DELETE',
            headers,
        });
        return await handleApiResponse(response);
    },

    /**
     * Checkout cart (bulk purchase)
     */
    async checkoutCart() {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/cart/checkout`, {
            method: 'POST',
            headers,
        });
        return await handleApiResponse(response);
    },

    // ==================== USER PURCHASE HISTORY ====================
    
    /**
     * Get user's purchased items
     */
    async getPurchasedItems(params = {}) {
        const queryString = new URLSearchParams();
        if (params.skip !== undefined) queryString.append('skip', params.skip);
        if (params.limit !== undefined) queryString.append('limit', params.limit);
        if (params.item_type) queryString.append('item_type', params.item_type);
        
        const headers = await getAuthHeadersWithRefresh();
        const url = `${API_BASE_URL}/user/purchased-items${queryString.toString() ? '?' + queryString.toString() : ''}`;
        const response = await fetch(url, { headers });
        return await handleApiResponse(response);
    },

    /**
     * Get enhanced user dashboard data
     */
    async getUserDashboard() {
        const headers = await getAuthHeadersWithRefresh();
        const response = await fetch(`${API_BASE_URL}/user/dashboard`, { headers });
        return await handleApiResponse(response);
    },

    // ==================== RAZORPAY INTEGRATION ====================
    
    /**
     * Initialize Razorpay payment
     */
    async initializeRazorpay() {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    },

    /**
     * Process Razorpay payment for individual item
     */
    async processItemPayment(itemData, user) {
        try {
            // Step 1: Initialize Razorpay
            const razorpayLoaded = await this.initializeRazorpay();
            if (!razorpayLoaded) {
                throw new Error('Failed to load Razorpay SDK');
            }

            // Step 2: Create order
            const orderData = await this.createItemOrder(itemData);

            // Step 3: Configure Razorpay options
            const options = {
                key: orderData.razorpay_key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'AutogenLabs',
                description: `Purchase ${itemData.item_type}: ${itemData.title || 'Item'}`,
                order_id: orderData.order_id,
                handler: async (response) => {
                    try {
                        // Step 4: Verify payment
                        const verificationResult = await this.verifyItemPurchase({
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            item_id: itemData.item_id,
                            item_type: itemData.item_type
                        });

                        return {
                            success: true,
                            data: verificationResult
                        };
                    } catch (error) {
                        return {
                            success: false,
                            error: error.message
                        };
                    }
                },
                prefill: {
                    name: user.name || user.firstName,
                    email: user.email,
                },
                theme: {
                    color: '#3B82F6'
                },
                modal: {
                    ondismiss: () => {
                        return {
                            success: false,
                            error: 'Payment cancelled'
                        };
                    }
                }
            };

            // Step 5: Open Razorpay checkout
            return new Promise((resolve) => {
                const rzp = new window.Razorpay({
                    ...options,
                    handler: async (response) => {
                        try {
                            const verificationResult = await this.verifyItemPurchase({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                item_id: itemData.item_id,
                                item_type: itemData.item_type
                            });

                            resolve({
                                success: true,
                                data: verificationResult
                            });
                        } catch (error) {
                            resolve({
                                success: false,
                                error: error.message
                            });
                        }
                    },
                    modal: {
                        ondismiss: () => {
                            resolve({
                                success: false,
                                error: 'Payment cancelled'
                            });
                        }
                    }
                });

                rzp.open();
            });

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    },

    /**
     * Process cart checkout payment
     */
    async processCartPayment(cartData, user) {
        try {
            // Step 1: Initialize Razorpay
            const razorpayLoaded = await this.initializeRazorpay();
            if (!razorpayLoaded) {
                throw new Error('Failed to load Razorpay SDK');
            }

            // Step 2: Checkout cart (creates order)
            const orderData = await this.checkoutCart();

            // Step 3: Configure Razorpay options
            const options = {
                key: orderData.razorpay_key_id,
                amount: orderData.amount,
                currency: orderData.currency,
                name: 'AutogenLabs',
                description: `Cart Purchase: ${cartData.items?.length || 1} items`,
                order_id: orderData.order_id,
                prefill: {
                    name: user.name || user.firstName,
                    email: user.email,
                },
                theme: {
                    color: '#3B82F6'
                }
            };

            // Step 4: Open Razorpay checkout
            return new Promise((resolve) => {
                const rzp = new window.Razorpay({
                    ...options,
                    handler: (response) => {
                        resolve({
                            success: true,
                            data: {
                                payment_id: response.razorpay_payment_id,
                                order_id: response.razorpay_order_id,
                                signature: response.razorpay_signature
                            }
                        });
                    },
                    modal: {
                        ondismiss: () => {
                            resolve({
                                success: false,
                                error: 'Payment cancelled'
                            });
                        }
                    }
                });

                rzp.open();
            });

        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }
};

export { ApiError };

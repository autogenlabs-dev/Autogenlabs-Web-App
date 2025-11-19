/**
 * Shopping Cart Context
 * Manages global cart state and functionality
 */

'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { paymentApi } from '../lib/paymentApi';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { isAuthenticated, getToken } = useAuth();

    // Load cart on auth change
    useEffect(() => {
        if (isAuthenticated) {
            loadCart();
        } else {
            resetCart();
        }
    }, [isAuthenticated]);

    const resetCart = () => {
        setCart(null);
        setCartItems([]);
        setCartCount(0);
        setCartTotal(0);
    };

    const loadCart = async () => {
        if (!isAuthenticated) {
            console.log('ℹ️ Skipping loadCart - user not authenticated');
            return;
        }

        if (!getToken || typeof getToken !== 'function') {
            console.warn('⚠️ getToken is not available yet');
            return;
        }
        
        try {
            setLoading(true);
            const token = await getToken();
            
            if (!token) {
                console.warn('⚠️ No auth token available for loadCart');
                setLoading(false);
                return;
            }

            const cartData = await paymentApi.getCart(token);
            updateCartState(cartData);
        } catch (error) {
            // Don't show auth errors or 404s as actual errors
            if (error.status !== 404 && !error.message?.includes('Authentication required')) {
                console.error('Failed to load cart:', error);
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const updateCartState = (cartData) => {
        if (cartData && cartData.items) {
            setCart(cartData);
            setCartItems(cartData.items);
            setCartCount(cartData.items.length);
            setCartTotal(cartData.total_price_inr || 0);
        } else {
            resetCart();
        }
    };

    const addToCart = async (item) => {
        if (!isAuthenticated) {
            throw new Error('Please login to add items to cart');
        }

        if (!getToken || typeof getToken !== 'function') {
            throw new Error('Authentication system not ready');
        }

        try {
            setLoading(true);
            setError(null);
            const token = await getToken();
            
            const cartData = await paymentApi.addToCart({
                item_id: item.id,
                item_type: item.type, // 'template' or 'component'
                price_inr: item.pricing_inr || item.pricingINR || 0
            }, token);
            
            updateCartState(cartData);
            return { success: true, message: 'Item added to cart successfully' };
        } catch (error) {
            console.error('Failed to add to cart:', error);
            setError(error.message || 'Failed to add item to cart');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        if (!isAuthenticated) return;

        if (!getToken || typeof getToken !== 'function') {
            console.warn('⚠️ getToken is not available yet');
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            const cartData = await paymentApi.removeFromCart(itemId, token);
            updateCartState(cartData);
        } catch (error) {
            console.error('Failed to remove from cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearCart = async () => {
        if (!isAuthenticated) return;

        if (!getToken || typeof getToken !== 'function') {
            console.warn('⚠️ getToken is not available yet');
            return;
        }

        try {
            setLoading(true);
            const token = await getToken();
            await paymentApi.clearCart(token);
            resetCart();
        } catch (error) {
            console.error('Failed to clear cart:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const isItemInCart = (itemId) => {
        return cartItems.some(item => item.item_id === itemId);
    };

    const getCartItemCount = () => {
        return cartCount;
    };

    const getCartTotal = () => {
        return cartTotal;
    };

    const checkout = async () => {
        if (!isAuthenticated) {
            throw new Error('Please login to checkout');
        }

        if (cartItems.length === 0) {
            throw new Error('Cart is empty');
        }

        try {
            setLoading(true);
            setError(null);
            
            const result = await paymentApi.checkoutCart();
            
            // If successful, clear the cart
            if (result.success) {
                resetCart();
            }
            
            return result;
        } catch (error) {
            setError(error.message);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        // State
        cart,
        cartItems,
        cartCount,
        cartTotal,
        loading,
        error,
        
        // Actions
        loadCart,
        addToCart,
        removeFromCart,
        clearCart,
        checkout,
        
        // Utilities
        isItemInCart,
        getCartItemCount,
        getCartTotal,
        
        // Clear error
        clearError: () => setError(null)
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

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
    const { isAuthenticated } = useAuth();

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
        if (!isAuthenticated) return;
        
        try {
            setLoading(true);
            const cartData = await paymentApi.getCart();
            updateCartState(cartData);
        } catch (error) {
            console.error('Failed to load cart:', error);
            if (error.status !== 404) { // 404 means empty cart, which is normal
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

        try {
            setLoading(true);
            setError(null);
            
            const cartData = await paymentApi.addToCart({
                item_id: item.id,
                item_type: item.type, // 'template' or 'component'
                price_inr: item.pricing_inr || item.pricingINR || 0
            });
            
            updateCartState(cartData);
            return { success: true, message: 'Item added to cart successfully' };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            setLoading(true);
            setError(null);
            
            await paymentApi.removeFromCart(itemId);
            await loadCart(); // Reload cart after removal
            
            return { success: true, message: 'Item removed from cart' };
        } catch (error) {
            setError(error.message);
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const clearCart = () => {
        resetCart();
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


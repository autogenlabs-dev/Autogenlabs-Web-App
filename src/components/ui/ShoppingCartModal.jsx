/**
 * Shopping Cart Component
 * Displays cart items and handles checkout
 */

'use client';
import React, { useState } from 'react';
import { X, ShoppingCart, Trash2, CreditCard, IndianRupee, Loader, AlertCircle } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { paymentApi } from '../../lib/paymentApi';

const ShoppingCartModal = ({ isOpen, onClose }) => {
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [checkoutError, setCheckoutError] = useState('');
    
    const { 
        cartItems, 
        cartTotal, 
        cartCount, 
        removeFromCart, 
        loading,
        clearError,
        error: cartError 
    } = useCart();
    const { user } = useAuth();

    const handleRemoveItem = async (itemId) => {
        const result = await removeFromCart(itemId);
        if (!result.success) {
            console.error('Failed to remove item:', result.error);
        }
    };

    const handleCheckout = async () => {
        if (cartItems.length === 0) return;

        setCheckoutLoading(true);
        setCheckoutError('');

        try {
            const result = await paymentApi.processCartPayment({
                items: cartItems,
                total: cartTotal
            }, user);

            if (result.success) {
                // Payment successful, close modal
                onClose();
                // You might want to show a success message or redirect
            } else {
                setCheckoutError(result.error || 'Checkout failed');
            }
        } catch (error) {
            setCheckoutError(error.message || 'Checkout failed');
        } finally {
            setCheckoutLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
            
            {/* Modal */}
            <div className="relative min-h-screen flex items-center justify-center p-4">
                <div className="relative bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 w-full max-w-2xl max-h-[80vh] overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <ShoppingCart className="w-6 h-6 text-white" />
                            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
                            {cartCount > 0 && (
                                <span className="bg-white/20 text-white text-sm px-2 py-1 rounded-full">
                                    {cartCount} item{cartCount > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col h-[calc(80vh-80px)]">
                        {/* Error Messages */}
                        {(cartError || checkoutError) && (
                            <div className="m-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                                <span>{cartError || checkoutError}</span>
                                <button
                                    onClick={() => {
                                        clearError();
                                        setCheckoutError('');
                                    }}
                                    className="ml-auto text-red-300 hover:text-red-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-12">
                                    <Loader className="w-8 h-8 animate-spin text-blue-500" />
                                    <span className="ml-3 text-gray-400">Loading cart...</span>
                                </div>
                            ) : cartItems.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">Your cart is empty</h3>
                                    <p className="text-gray-500">Add some templates or components to get started!</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div
                                            key={`${item.item_type}-${item.item_id}`}
                                            className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-gray-600 transition-colors"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-white mb-1">
                                                        {item.item_title || 'Untitled Item'}
                                                    </h4>
                                                    <p className="text-sm text-gray-400 mb-2">
                                                        {item.item_type === 'template' ? 'Template' : 'Component'}
                                                    </p>
                                                    <div className="flex items-center text-green-400 font-medium">
                                                        <IndianRupee className="w-4 h-4" />
                                                        <span>{item.price_inr || 0}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.item_id)}
                                                    className="text-red-400 hover:text-red-300 transition-colors ml-4"
                                                    disabled={loading}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-800 p-6 bg-gray-900/50">
                                {/* Total */}
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-semibold text-gray-300">Total:</span>
                                    <div className="flex items-center text-2xl font-bold text-green-400">
                                        <IndianRupee className="w-6 h-6" />
                                        <span>{cartTotal}</span>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={checkoutLoading || cartItems.length === 0}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                >
                                    {checkoutLoading ? (
                                        <>
                                            <Loader className="w-5 h-5 mr-2 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CreditCard className="w-5 h-5 mr-2" />
                                            <span>Proceed to Checkout</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-xs text-gray-500 text-center mt-3">
                                    Secure payment powered by Razorpay
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartModal;


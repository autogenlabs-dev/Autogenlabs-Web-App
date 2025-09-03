/**
 * Purchase Button Component
 * Handles individual item purchases with Razorpay integration
 */

'use client';
import React, { useState } from 'react';
import { ShoppingCart, CreditCard, Loader, CheckCircle, AlertCircle, IndianRupee } from 'lucide-react';
import { paymentApi } from '../../lib/paymentApi';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { useRouter } from 'next/navigation';

const PurchaseButton = ({ 
    item, 
    size = 'medium', 
    showPrice = true, 
    showCartOption = true,
    onPurchaseSuccess,
    className = ''
}) => {
    const [loading, setLoading] = useState(false);
    const [cartLoading, setCartLoading] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState(null);
    const [error, setError] = useState('');
    
    const { user, isAuthenticated } = useAuth();
    const { addToCart, isItemInCart } = useCart();
    const router = useRouter();

    // Check if item is free
    const isFree = !item.pricing_inr || item.pricing_inr === 0 || item.plan_type === 'Free';
    const price = item.pricing_inr || item.pricingINR || 0;
    const itemInCart = isItemInCart(item.id);

    const sizeClasses = {
        small: 'px-3 py-1.5 text-sm',
        medium: 'px-4 py-2 text-sm',
        large: 'px-6 py-3 text-base'
    };

    const handleLogin = () => {
        router.push('/auth');
    };

    const handlePurchase = async () => {
        if (!isAuthenticated) {
            handleLogin();
            return;
        }

        if (isFree) {
            // For free items, just simulate immediate access
            setPurchaseStatus('success');
            if (onPurchaseSuccess) {
                onPurchaseSuccess({
                    item,
                    purchase_type: 'free',
                    access_granted: true
                });
            }
            return;
        }

        setLoading(true);
        setError('');
        setPurchaseStatus(null);

        try {
            const result = await paymentApi.processItemPayment({
                item_id: item.id,
                item_type: item.type || 'template', // Assume template if not specified
                price_inr: price,
                title: item.title || item.name
            }, user);

            if (result.success) {
                setPurchaseStatus('success');
                if (onPurchaseSuccess) {
                    onPurchaseSuccess({
                        item,
                        purchase_data: result.data,
                        purchase_type: 'paid'
                    });
                }
            } else {
                setError(result.error || 'Payment failed');
                setPurchaseStatus('error');
            }
        } catch (error) {
            setError(error.message || 'Payment failed');
            setPurchaseStatus('error');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!isAuthenticated) {
            handleLogin();
            return;
        }

        if (isFree) {
            // Free items don't need to be in cart
            handlePurchase();
            return;
        }

        setCartLoading(true);
        setError('');

        try {
            const result = await addToCart({
                id: item.id,
                type: item.type || 'template',
                pricing_inr: price,
                title: item.title || item.name
            });

            if (!result.success) {
                setError(result.error || 'Failed to add to cart');
            }
        } catch (error) {
            setError(error.message || 'Failed to add to cart');
        } finally {
            setCartLoading(false);
        }
    };

    // If user has already purchased this item (you'd need to track this)
    if (purchaseStatus === 'success') {
        return (
            <div className={`${sizeClasses[size]} ${className} bg-green-600 text-white rounded-lg flex items-center justify-center`}>
                <CheckCircle className="w-4 h-4 mr-2" />
                <span>Purchased</span>
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {/* Error Message */}
            {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-2 text-red-200 text-sm flex items-center">
                    <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            <div className="flex items-center space-x-2">
                {/* Main Purchase Button */}
                <button
                    onClick={handlePurchase}
                    disabled={loading}
                    className={`
                        ${sizeClasses[size]} ${className}
                        ${isFree 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }
                        text-white rounded-lg font-medium transition-all duration-200 
                        disabled:opacity-50 disabled:cursor-not-allowed
                        flex items-center justify-center flex-1 min-w-0
                        hover:scale-105 transform
                    `}
                >
                    {loading ? (
                        <>
                            <Loader className="w-4 h-4 mr-2 animate-spin" />
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            {isFree ? (
                                <>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    <span>Get Free</span>
                                </>
                            ) : (
                                <>
                                    <CreditCard className="w-4 h-4 mr-2" />
                                    <span>Buy Now</span>
                                    {showPrice && (
                                        <span className="ml-2 flex items-center">
                                            <IndianRupee className="w-3 h-3" />
                                            {price}
                                        </span>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </button>

                {/* Add to Cart Button */}
                {showCartOption && !isFree && (
                    <button
                        onClick={handleAddToCart}
                        disabled={cartLoading || itemInCart}
                        className={`
                            ${sizeClasses[size]}
                            ${itemInCart 
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed' 
                                : 'bg-gray-700 hover:bg-gray-600 text-white'
                            }
                            rounded-lg font-medium transition-all duration-200 
                            disabled:opacity-50 disabled:cursor-not-allowed
                            flex items-center justify-center
                            hover:scale-105 transform
                        `}
                        title={itemInCart ? 'Already in cart' : 'Add to cart'}
                    >
                        {cartLoading ? (
                            <Loader className="w-4 h-4 animate-spin" />
                        ) : (
                            <ShoppingCart className={`w-4 h-4 ${itemInCart ? 'fill-current' : ''}`} />
                        )}
                    </button>
                )}
            </div>

            {/* Price Display */}
            {showPrice && !isFree && (
                <div className="text-center">
                    <span className="text-sm text-gray-400">
                        Price: <span className="text-white font-medium flex items-center justify-center">
                            <IndianRupee className="w-3 h-3" />
                            {price}
                        </span>
                    </span>
                </div>
            )}
        </div>
    );
};

export default PurchaseButton;


'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Lock, IndianRupee, DollarSign, X } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, template, selectedCurrency = 'inr' }) => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    if (!isOpen || !template) return null;

    const price = selectedCurrency === 'inr' ? template.pricing.inr : template.pricing.usd;
    const currency = selectedCurrency === 'inr' ? 'INR' : 'USD';
    const symbol = selectedCurrency === 'inr' ? '₹' : '$';

    const handlePayment = async (method) => {
        setIsProcessing(true);

        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (method === 'stripe') {
                // In real app, integrate with Stripe
                console.log('Processing Stripe payment:', {
                    templateId: template.id,
                    amount: price,
                    currency: currency,
                    cardDetails
                });
            } else if (method === 'razorpay') {
                // In real app, integrate with Razorpay
                console.log('Processing Razorpay payment:', {
                    templateId: template.id,
                    amount: price,
                    currency: currency
                });
            }

            alert(`Payment successful! You can now download the template.`);
            onClose();

        } catch (error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
                className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10">
                    <div>
                        <h2 className="text-2xl font-bold text-white">Complete Purchase</h2>
                        <p className="text-gray-400 mt-1">Secure payment for {template.title}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-6 space-y-6">

                    {/* Order Summary */}
                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                        <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                                    <CreditCard className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">{template.title}</p>
                                    <p className="text-sm text-gray-400">{template.category}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-2xl font-bold text-green-400">
                                    {symbol}{price}
                                </p>
                                <p className="text-sm text-gray-400">{currency}</p>
                            </div>
                        </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Choose Payment Method</h3>
                        <div className="space-y-3">

                            {/* Stripe Option */}
                            <button
                                onClick={() => setPaymentMethod('stripe')}
                                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${paymentMethod === 'stripe'
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-white/20 bg-white/5 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Stripe</p>
                                            <p className="text-sm text-gray-400">Card, Apple Pay, Google Pay</p>
                                        </div>
                                    </div>
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                            </button>

                            {/* Razorpay Option */}
                            <button
                                onClick={() => setPaymentMethod('razorpay')}
                                className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${paymentMethod === 'razorpay'
                                        ? 'border-blue-500 bg-blue-500/10'
                                        : 'border-white/20 bg-white/5 hover:border-white/30'
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                            <IndianRupee className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">Razorpay</p>
                                            <p className="text-sm text-gray-400">UPI, Cards, Net Banking, Wallets</p>
                                        </div>
                                    </div>
                                    <Shield className="w-5 h-5 text-green-400" />
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Card Details (for Stripe) */}
                    {paymentMethod === 'stripe' && (
                        <motion.div
                            className="space-y-4"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            transition={{ duration: 0.3 }}
                        >
                            <h4 className="text-md font-semibold text-white">Card Details</h4>

                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Cardholder Name
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.cardholderName}
                                        onChange={(e) => setCardDetails(prev => ({ ...prev, cardholderName: e.target.value }))}
                                        placeholder="John Doe"
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Card Number
                                    </label>
                                    <input
                                        type="text"
                                        value={cardDetails.cardNumber}
                                        onChange={(e) => setCardDetails(prev => ({ ...prev, cardNumber: e.target.value }))}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength="19"
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Expiry Date
                                        </label>
                                        <input
                                            type="text"
                                            value={cardDetails.expiryDate}
                                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiryDate: e.target.value }))}
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            CVV
                                        </label>
                                        <input
                                            type="text"
                                            value={cardDetails.cvv}
                                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value }))}
                                            placeholder="123"
                                            maxLength="4"
                                            className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Security Notice */}
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 flex items-start gap-3">
                        <Lock className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="text-green-400 font-medium">Secure Payment</p>
                            <p className="text-sm text-gray-300">
                                Your payment information is encrypted and secure. We never store your card details.
                            </p>
                        </div>
                    </div>

                    {/* Payment Button */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={() => handlePayment(paymentMethod)}
                            disabled={!paymentMethod || isProcessing}
                            className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${paymentMethod && !isProcessing
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Pay {symbol}{price}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaymentModal;

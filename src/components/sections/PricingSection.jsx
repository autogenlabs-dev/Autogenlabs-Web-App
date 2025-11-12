'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { paymentApi } from '../../lib/api';
import { useAuth } from '@clerk/nextjs';

const PricingSection = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // USD to INR conversion rate (approximate)
  const USD_TO_INR = 85;

  const pricingPlans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      priceINR: 0,
      period: 'forever',
      description: 'A fast way to get started with Codemurf',
      features: [
        'Up to 3 AI agents',
        '100 messages per month',
        'Basic chat interface',
        'Community support',
        'Basic templates',
        'Standard response time'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'secondary',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 20,
      priceINR: Math.round(20 * USD_TO_INR),
      period: 'month',
      description: 'Unlimited completions and chat with access to more models.',
      features: [
        'Unlimited AI agents',
        'Unlimited messages',
        'Advanced chat interface',
        'Priority support',
        'All premium templates',
        'Custom agent training',
        'Advanced analytics',
        'Team collaboration',
        'API access'
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'primary',
      popular: true
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 50,
      priceINR: Math.round(50 * USD_TO_INR),
      period: 'month',
      description: 'Built for growing teams and enterprises',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom deployment options',
        'SSO integration',
        'Advanced security features',
        'SLA guarantee',
        'Custom agent training',
        'White-label options',
        'Unlimited team members',
        'Priority feature requests'
      ],
      buttonText: 'Get Ultra',
      buttonVariant: 'primary',
      popular: false
    }
  ];

  const handlePlanSelect = async (plan) => {
    if (plan.id === 'free') {
      // Open VS Code extension marketplace for free plan users
      window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank');
      // Also redirect to signup/dashboard for account creation
      setTimeout(() => {
        window.location.href = '/auth';
      }, 500);
      return;
    }

    // Handle Pro and Ultra plan payments with Razorpay
    // Get Clerk session token
    const { getToken } = useAuth();
    const token = await getToken();
    
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = '/auth?redirect=/pricing';
      return;
    }

    setSelectedPlan(plan);
    setIsLoading(true);

    try {
      await initializeRazorpay(plan, token);
    } catch (error) {
      console.error('Payment initialization failed:', error);
      alert('Payment initialization failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const initializeRazorpay = async (plan, accessToken) => {
    try {
      // Create order through backend
      const orderResponse = await paymentApi.createOrder(accessToken, plan.id, plan.price);
      
      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create order');
      }

      const orderDetails = orderResponse.order;

      // Load Razorpay script
      await loadRazorpayScript();

      const options = {
        key: orderDetails.key_id,
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: 'Codemurf',
        description: `${plan.name} Plan Subscription`,
        image: '/logo-icon.png', // Use a simple icon for payment
        order_id: orderDetails.order_id,
        handler: function (response) {
          handlePaymentSuccess(response, plan, accessToken);
        },
        prefill: {
          name: '',
          email: '',
          contact: ''
        },
        notes: {
          plan_id: plan.id,
          plan_name: plan.name
        },
        theme: {
          color: '#8B5CF6'
        },
        modal: {
          ondismiss: function() {
            setSelectedPlan(null);
            setIsLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Payment initialization error:', error);
      throw error;
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay script'));

      document.body.appendChild(script);
    });
  };

  const handlePaymentSuccess = async (paymentResponse, plan, accessToken) => {
    try {
      setIsLoading(true);
      
      const verificationData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        plan_name: plan.id
      };

      const verificationResponse = await paymentApi.verifyPayment(accessToken, verificationData);
      
      if (verificationResponse.success && verificationResponse.verified) {
        alert('Payment successful! Welcome to Codemurf ' + plan.name + '!');
        window.location.href = '/dashboard';
      } else {
        throw new Error('Payment verification failed');
      }
      
    } catch (error) {
      console.error('Payment verification failed:', error);
      alert('Payment verification failed. Please contact support with your payment ID: ' + paymentResponse.razorpay_payment_id);
    } finally {
      setIsLoading(false);
      setSelectedPlan(null);
    }
  };

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -8,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  const glassVariants = {
    initial: { 
      backdropFilter: "blur(10px)",
      background: "rgba(255, 255, 255, 0.05)"
    },
    hover: { 
      backdropFilter: "blur(20px)",
      background: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <section id='pricing' className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden'>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07060B] via-[#0A090E] to-[#0D0B12]" />
      
      {/* Glassmorphism Background Orbs */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />

      {/* Additional Background Elements for Glassmorphism */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Shapes */}
        <div className="absolute top-32 left-20 w-32 h-32 border border-purple-500/30 rounded-lg rotate-12" />
        <div className="absolute top-48 right-32 w-24 h-24 border border-cyan-500/30 rounded-full" />
        <div className="absolute bottom-40 left-32 w-40 h-40 border border-pink-500/30 rounded-lg rotate-45" />
        <div className="absolute bottom-32 right-20 w-28 h-28 border border-yellow-500/30 rounded-full" />
        
        {/* Circuit-like patterns */}
        <div className="absolute top-64 left-1/4 w-64 h-1 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
        <div className="absolute top-80 left-1/4 w-1 h-32 bg-gradient-to-b from-purple-500/40 to-transparent" />
        <div className="absolute top-96 right-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute top-80 right-1/4 w-1 h-40 bg-gradient-to-b from-cyan-500/40 to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
        
        {/* Floating dots */}
        <div className="absolute top-40 left-1/3 w-2 h-2 bg-purple-500/50 rounded-full" />
        <div className="absolute top-56 left-2/3 w-1.5 h-1.5 bg-cyan-500/50 rounded-full" />
        <div className="absolute bottom-48 left-1/2 w-2.5 h-2.5 bg-pink-500/50 rounded-full" />
        <div className="absolute bottom-64 left-3/4 w-1.5 h-1.5 bg-yellow-500/50 rounded-full" />
        
        {/* Abstract shapes */}
        <div className="absolute top-72 right-1/3 w-16 h-16 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full" />
        <div className="absolute bottom-72 left-1/2 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-lg rotate-12" />
        
        {/* Connected lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800" fill="none">
          <path
            d="M 200 300 Q 400 200 600 300 Q 800 400 1000 300"
            stroke="rgba(139,92,246,0.2)"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
          />
          <path
            d="M 100 500 Q 300 400 500 500 Q 700 600 900 500"
            stroke="rgba(6,182,212,0.2)"
            strokeWidth="2"
            strokeDasharray="8,4"
            fill="none"
          />
        </svg>
        
        {/* Hexagonal pattern */}
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <path d="M40 10 L60 25 L60 55 L40 70 L20 55 L20 25 Z" stroke="rgba(139,92,246,0.6)" strokeWidth="1" fill="none" />
            <path d="M40 20 L55 30 L55 50 L40 60 L25 50 L25 30 Z" stroke="rgba(6,182,212,0.6)" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-24">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.p 
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Deploy your applications with confidence. Start free and scale as you grow.
        </motion.p>
        
        {/* Billing Toggle */}
        <motion.div 
          className="flex items-center justify-center gap-4 relative z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <span className="text-gray-400">Monthly</span>
          <div className="relative">
            <div className="w-12 h-6 bg-gray-700 rounded-full p-1">
              <div className="w-4 h-4 bg-purple-500 rounded-full transition-transform duration-300" />
            </div>
          </div>
          <span className="text-gray-400">Yearly</span>
          <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">Save 20%</span>
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <motion.div
            key={plan.id}
            className={`relative flex-1 max-w-sm ${plan.popular ? 'lg:scale-105 lg:-mt-4' : ''}`}
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            onMouseEnter={() => setHoveredPlan(plan.id)}
            onMouseLeave={() => setHoveredPlan(null)}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              </div>
            )}

            {/* Glass Card */}
            <motion.div
              className={`relative h-full rounded-2xl border border-white/20 shadow-2xl overflow-hidden ${
                plan.popular ? 'border-purple-500/50' : ''
              }`}
              variants={glassVariants}
              initial="initial"
              animate={hoveredPlan === plan.id ? "hover" : "initial"}
              style={{
                background: hoveredPlan === plan.id 
                  ? `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`
                  : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                backdropFilter: hoveredPlan === plan.id ? "blur(20px)" : "blur(10px)",
              }}
            >
              {/* Gradient Border Effect */}
              <div className={`absolute inset-0 rounded-2xl ${
                plan.popular 
                  ? 'bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20' 
                  : hoveredPlan === plan.id 
                    ? 'bg-gradient-to-br from-white/10 via-transparent to-white/10'
                    : ''
              }`} />

              {/* Card Content */}
              <div className="relative z-10 p-8 h-full flex flex-col">
                {/* Plan Header */}
                <div className="text-center mb-8">
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center">
                    {typeof plan.price === 'number' ? (
                      <>
                        <div className="text-center">
                          <div className="flex items-baseline justify-center mb-2">
                            <span className="text-4xl font-bold text-white">${plan.price}</span>
                            <span className="text-gray-400 ml-2">/{plan.period}</span>
                          </div>
                          {plan.price > 0 && (
                            <div className="text-lg text-purple-400">
                              ₹{plan.priceINR.toLocaleString('en-IN')}
                              <span className="text-sm text-gray-400">/{plan.period}</span>
                            </div>
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <div className="flex-1 mb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mr-3 flex-shrink-0">
                          <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <motion.button
                  onClick={() => handlePlanSelect(plan)}
                  disabled={isLoading && selectedPlan?.id === plan.id}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/25'
                      : 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30'
                  } ${
                    isLoading && selectedPlan?.id === plan.id 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:scale-105'
                  }`}
                  whileHover={{ scale: isLoading && selectedPlan?.id === plan.id ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading && selectedPlan?.id === plan.id ? 'Processing...' : plan.buttonText}
                </motion.button>
              </div>

              {/* Glassmorphism Shine Effect */}
              {hoveredPlan === plan.id && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    background: `linear-gradient(135deg, 
                      rgba(255,255,255,0.1) 0%, 
                      rgba(255,255,255,0.05) 25%, 
                      transparent 50%, 
                      rgba(255,255,255,0.05) 75%, 
                      rgba(255,255,255,0.1) 100%)`
                  }}
                />
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PricingSection;

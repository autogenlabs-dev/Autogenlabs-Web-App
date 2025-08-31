'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, Star, Zap } from 'lucide-react';
import { paymentApi, tokenUtils } from '../../lib/api';

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState(null);

  // USD to INR conversion rate (approximate)
  const USD_TO_INR = 85;

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      priceINR: 0,
      period: 'forever',
      description: 'Perfect for getting started',
      popular: false,
      features: [
        'Up to 3 AI agents',
        'Basic chat interface',
        '100 messages per month',
        'Community support',
        'Basic templates',
        'Standard response time'
      ],
      limitations: [
        'Limited customization',
        'No advanced features',
        'No priority support'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'secondary'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 20,
      priceINR: Math.round(20 * USD_TO_INR),
      period: 'month',
      description: 'Best for professionals and small teams',
      popular: true,
      features: [
        'Unlimited AI agents',
        'Advanced chat interface',
        'Unlimited messages',
        'Priority support',
        'All premium templates',
        'Custom agent training',
        'Advanced analytics',
        'Team collaboration',
        'API access',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'primary'
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 50,
      priceINR: Math.round(50 * USD_TO_INR),
      period: 'month',
      description: 'For large organizations with advanced needs',
      popular: false,
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
        'Priority feature requests',
        'Advanced analytics dashboard',
        'Custom integrations'
      ],
      limitations: [],
      buttonText: 'Get Ultra',
      buttonVariant: 'primary'
    }
  ];

  const comparisonFeatures = [
    { name: 'AI Agents', free: '3', pro: 'Unlimited', ultra: 'Unlimited' },
    { name: 'Messages per month', free: '100', pro: 'Unlimited', ultra: 'Unlimited' },
    { name: 'Advanced chat interface', free: false, pro: true, ultra: true },
    { name: 'Priority support', free: false, pro: true, ultra: true },
    { name: 'Premium templates', free: false, pro: true, ultra: true },
    { name: 'Custom agent training', free: false, pro: true, ultra: true },
    { name: 'Team collaboration', free: false, pro: true, ultra: true },
    { name: 'API access', free: false, pro: true, ultra: true },
    { name: 'Advanced analytics', free: false, pro: true, ultra: true },
    { name: 'SSO integration', free: false, pro: false, ultra: true },
    { name: 'Dedicated account manager', free: false, pro: false, ultra: true },
    { name: 'Custom deployment', free: false, pro: false, ultra: true },
    { name: 'SLA guarantee', free: false, pro: false, ultra: true },
    { name: 'White-label options', free: false, pro: false, ultra: true },
  ];

  const handlePlanSelect = async (plan) => {
    if (plan.id === 'free') {
      // Redirect to signup/dashboard for free plan
      window.location.href = '/auth';
      return;
    }

    // Handle Pro and Ultra plan payments with Razorpay
    const accessToken = tokenUtils.getAccessToken();
    if (!accessToken) {
      // Redirect to login if not authenticated
      window.location.href = '/auth?redirect=/pricing';
      return;
    }

    setSelectedPlan(plan);
    setIsLoading(true);

    try {
      await initializeRazorpay(plan, accessToken);
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
          color: '#8B5CF6' // Purple theme to match the app
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
      // Check if Razorpay is already loaded
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
      
      console.log('Payment response received:', paymentResponse);
      console.log('Plan details:', plan);
      
      // Verify payment through backend
      const verificationData = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_payment_id: paymentResponse.razorpay_payment_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        plan_name: plan.id
      };

      console.log('Sending verification data:', verificationData);

      const verificationResponse = await paymentApi.verifyPayment(accessToken, verificationData);
      
      console.log('Verification response:', verificationResponse);
      
      if (verificationResponse.success && verificationResponse.verified) {
        alert('Payment successful! Welcome to Codemurf ' + plan.name + '!');
        window.location.href = '/dashboard';
      } else {
        console.error('Verification failed - response:', verificationResponse);
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

  return (
    <div className="bg-[linear-gradient(180deg,_#040406_50%,_#09080D_100%)] min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <div className="relative z-10 pt-32 pb-16 px-6 md:px-44">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 bg-purple-600/20 rounded-full border border-purple-500/30 mb-8">
            <Zap className="w-4 h-4 text-purple-400 mr-2" />
            <span className="text-purple-300 text-sm font-medium">
              Launch Special: 50% off first month
            </span>
          </div>
          
          <motion.h1 
            className="text-5xl md:text-6xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Choose the perfect plan for your AI automation journey. 
            Start free and scale as you grow.
          </motion.p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="relative z-10 px-6 md:px-44 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className={`relative flex-1 max-w-sm ${plan.popular ? 'lg:scale-105 lg:-mt-4' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full flex items-center">
                      <Star className="w-4 h-4 text-white mr-2" />
                      <span className="text-white text-sm font-semibold">Most Popular</span>
                    </div>
                  </div>
                )}

                <motion.div
                  className={`relative h-full rounded-2xl border shadow-2xl overflow-hidden transition-all duration-300 ${
                    plan.popular ? 'border-purple-500/50' : 'border-white/20'
                  }`}
                  style={{
                    background: hoveredPlan === plan.id 
                      ? `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`
                      : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                    backdropFilter: hoveredPlan === plan.id ? "blur(20px)" : "blur(10px)",
                  }}
                  whileHover={{ scale: 1.02, y: -8 }}
                >
                  <div className="relative z-10 p-8 h-full flex flex-col">
                    {/* Plan Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                      <p className="text-gray-400 mb-6">{plan.description}</p>
                      
                      <div className="mb-6">
                        {plan.price === 0 ? (
                          <div className="text-4xl font-bold text-white">Free</div>
                        ) : (
                          <div>
                            <div className="text-4xl font-bold text-white mb-2">
                              ${plan.price}
                              <span className="text-lg text-gray-400 font-normal">/{plan.period}</span>
                            </div>
                            <div className="text-lg text-purple-400">
                              ₹{plan.priceINR.toLocaleString('en-IN')}
                              <span className="text-sm text-gray-400">/{plan.period}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.button
                        onClick={() => handlePlanSelect(plan)}
                        disabled={isLoading && selectedPlan?.id === plan.id}
                        className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                          plan.buttonVariant === 'primary'
                            ? 'bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/25'
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

                    {/* Features */}
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-4">Everything included:</h4>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {plan.limitations.length > 0 && (
                        <div className="mt-6">
                          <h4 className="text-gray-400 font-semibold mb-3">Limitations:</h4>
                          <ul className="space-y-2">
                            {plan.limitations.map((limitation, index) => (
                              <li key={index} className="flex items-start">
                                <X className="w-4 h-4 text-red-400 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-400 text-sm">{limitation}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Compare Plans Section */}
      <div className="relative z-10 px-6 md:px-44 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Compare Plans
          </motion.h2>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/20">
                    <th className="text-left py-4 px-6 text-white font-semibold">Features</th>
                    {plans.map((plan) => (
                      <th key={plan.id} className="text-center py-4 px-6 text-white font-semibold">
                        <div className="flex flex-col items-center">
                          <span className="text-lg">{plan.name}</span>
                          {plan.price > 0 && (
                            <span className="text-sm text-gray-400">
                              ${plan.price}/{plan.period}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((feature, index) => (
                    <tr key={index} className="border-b border-white/10 hover:bg-white/5">
                      <td className="py-4 px-6 text-gray-300">{feature.name}</td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.free === 'boolean' ? (
                          feature.free ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{feature.free}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.pro === 'boolean' ? (
                          feature.pro ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{feature.pro}</span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {typeof feature.ultra === 'boolean' ? (
                          feature.ultra ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span className="text-gray-300">{feature.ultra}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 px-6 md:px-44 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "What payment methods do you accept?",
                answer: "We accept all major credit cards, debit cards, and UPI payments through Razorpay. All transactions are secure and encrypted."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Yes! You can upgrade or downgrade your plan at any time. Changes will be prorated and reflected in your next billing cycle."
              },
              {
                question: "Is there a free trial?",
                answer: "Yes! The Pro and Ultra plans come with a 14-day free trial. No credit card required to start, and you can cancel anytime during the trial period."
              },
              {
                question: "What happens if I cancel my subscription?",
                answer: "You can cancel anytime. Your account will remain active until the end of your current billing period, after which you'll be moved to the free plan."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/20 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 md:px-44 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            className="bg-gradient-to-r from-purple-600/20 to-violet-600/20 backdrop-blur-sm rounded-2xl border border-purple-500/30 p-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to supercharge your workflow?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of users who are already automating their tasks with AI.
            </p>
            <motion.button
              onClick={() => handlePlanSelect(plans[1])} // Pro plan
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-500/25"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Free Trial
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;

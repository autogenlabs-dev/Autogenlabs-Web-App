'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setFormStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        role: '',
        message: ''
      });
      
      // Reset to idle after showing success
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@codemurf.com', 'support@codemurf.com'],
      description: 'Get in touch with our team'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      details: ['San Francisco, CA', 'United States'],
      description: 'Visit our main office'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: ['< 24 hours', 'Business days'],
      description: 'We respond quickly'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const inputVariants = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden' id='contact'>
      
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07060B] via-[#0A090E] to-[#0D0B12]" />
      
      {/* Far Background Layer - Large Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {/* Large hexagons */}
        <div className="absolute top-20 left-20 w-80 h-80 border border-purple-500/20 rotate-12" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }} />
        <div className="absolute bottom-20 right-20 w-96 h-96 border border-cyan-500/20 -rotate-12" style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }} />
        
        {/* Large circles */}
        <div className="absolute top-40 right-40 w-64 h-64 border border-pink-500/20 rounded-full" />
        <div className="absolute bottom-40 left-40 w-72 h-72 border border-emerald-500/20 rounded-full" />
      </div>

      {/* Mid Background Layer - Grid and Circuit Patterns */}
      <div className="absolute inset-0 overflow-hidden opacity-15">
        {/* Layered grid patterns at different scales */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '120px 120px'
        }} />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6,182,212,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Circuit Board Pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='circuit' x='0' y='0' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%234ade80' stroke-width='0.4'%3E%3Cline x1='30' y1='75' x2='120' y2='75'/%3E%3Cline x1='180' y1='75' x2='270' y2='75'/%3E%3Cline x1='60' y1='150' x2='150' y2='150'/%3E%3Cline x1='210' y1='150' x2='300' y2='150'/%3E%3Cline x1='0' y1='225' x2='90' y2='225'/%3E%3Cline x1='180' y1='225' x2='270' y2='225'/%3E%3Cline x1='75' y1='30' x2='75' y2='120'/%3E%3Cline x1='75' y1='180' x2='75' y2='270'/%3E%3Cline x1='150' y1='60' x2='150' y2='150'/%3E%3Cline x1='225' y1='0' x2='225' y2='90'/%3E%3Cline x1='225' y1='180' x2='225' y2='300'/%3E%3Cpath d='M120,75 L150,75 L150,105'/%3E%3Cpath d='M150,150 L180,150 L180,180'/%3E%3Cpath d='M90,225 L120,225 L120,195'/%3E%3Ccircle cx='75' cy='75' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3Ccircle cx='150' cy='150' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3Ccircle cx='225' cy='225' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23circuit)'/%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Animated Layer - Data Flow Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Complex flowing lines network */}
        <div className="absolute inset-0">
          {/* Primary horizontal flows */}
          <div
            className="absolute top-[20%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              animation: 'flowHorizontal 8s ease-in-out infinite',
              animationDelay: '0s'
            }}
          />
          <div
            className="absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent"
            style={{
              animation: 'flowHorizontal 12s ease-in-out infinite',
              animationDelay: '2s'
            }}
          />
          <div
            className="absolute top-[60%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-400/40 to-transparent"
            style={{
              animation: 'flowHorizontal 10s ease-in-out infinite',
              animationDelay: '4s'
            }}
          />
          <div
            className="absolute top-[80%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
            style={{
              animation: 'flowHorizontal 14s ease-in-out infinite',
              animationDelay: '6s'
            }}
          />
          
          {/* Primary vertical flows */}
          <div
            className="absolute left-[20%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-purple-400/40 to-transparent"
            style={{
              animation: 'flowVertical 9s ease-in-out infinite',
              animationDelay: '1s'
            }}
          />
          <div
            className="absolute left-[50%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
            style={{
              animation: 'flowVertical 11s ease-in-out infinite',
              animationDelay: '3s'
            }}
          />
          <div
            className="absolute left-[80%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-pink-400/40 to-transparent"
            style={{
              animation: 'flowVertical 13s ease-in-out infinite',
              animationDelay: '5s'
            }}
          />
          
          {/* Diagonal flow lines for more complexity */}
          <div
            className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent origin-left"
            style={{
              transform: 'rotate(15deg)',
              animation: 'flowHorizontal 16s ease-in-out infinite',
              animationDelay: '7s'
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-400/30 to-transparent origin-right"
            style={{
              transform: 'rotate(-15deg)',
              animation: 'flowHorizontal 18s ease-in-out infinite',
              animationDelay: '9s'
            }}
          />
        </div>

        {/* Enhanced connection points with varied sizes */}
        <div className="absolute inset-0">
          {/* Large nodes */}
          <div
            className="absolute top-[25%] left-[25%] w-3 h-3 bg-purple-400/50 rounded-full shadow-lg shadow-purple-400/25"
            style={{ animation: 'pulse 3s ease-in-out infinite' }}
          />
          <div
            className="absolute top-[50%] left-[50%] w-4 h-4 bg-cyan-400/50 rounded-full shadow-lg shadow-cyan-400/25"
            style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }}
          />
          <div
            className="absolute top-[75%] left-[75%] w-3 h-3 bg-pink-400/50 rounded-full shadow-lg shadow-pink-400/25"
            style={{ animation: 'pulse 5s ease-in-out infinite', animationDelay: '2s' }}
          />
          
          {/* Medium nodes */}
          <div
            className="absolute top-[30%] left-[70%] w-2 h-2 bg-emerald-400/40 rounded-full"
            style={{ animation: 'pulse 3.5s ease-in-out infinite', animationDelay: '0.5s' }}
          />
          <div
            className="absolute top-[60%] left-[30%] w-2 h-2 bg-violet-400/40 rounded-full"
            style={{ animation: 'pulse 4.5s ease-in-out infinite', animationDelay: '1.5s' }}
          />
          <div
            className="absolute top-[40%] left-[80%] w-2 h-2 bg-orange-400/40 rounded-full"
            style={{ animation: 'pulse 3.8s ease-in-out infinite', animationDelay: '2.2s' }}
          />
          
          {/* Small nodes */}
          <div
            className="absolute top-[15%] left-[60%] w-1.5 h-1.5 bg-cyan-300/30 rounded-full"
            style={{ animation: 'pulse 2.8s ease-in-out infinite', animationDelay: '0.8s' }}
          />
          <div
            className="absolute top-[85%] left-[40%] w-1.5 h-1.5 bg-purple-300/30 rounded-full"
            style={{ animation: 'pulse 3.2s ease-in-out infinite', animationDelay: '1.8s' }}
          />
        </div>
      </div>

      {/* Atmospheric Glow Layer */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Multiple layered glows for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '8s'}} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/8 rounded-full blur-3xl animate-pulse" style={{animationDuration: '12s'}} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDuration: '15s'}} />
        
        {/* Smaller accent glows */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-emerald-500/6 rounded-full blur-2xl animate-pulse" style={{animationDuration: '6s', animationDelay: '2s'}} />
        <div className="absolute bottom-1/3 left-1/3 w-64 h-64 bg-violet-500/6 rounded-full blur-2xl animate-pulse" style={{animationDuration: '10s', animationDelay: '4s'}} />
      </div>

      {/* Near Layer - Subtle geometric overlays */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        {/* Abstract shapes for foreground depth */}
        <div className="absolute top-32 right-32 w-32 h-32 border border-white/10 rounded-lg rotate-45" />
        <div className="absolute bottom-32 left-32 w-24 h-24 border border-white/10 rounded-full" />
        <div className="absolute top-1/2 left-20 w-16 h-16 border border-white/10" style={{
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)'
        }} />
        <div className="absolute top-1/2 right-20 w-20 h-20 border border-white/10 rotate-12" style={{
          clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)'
        }} />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Ready to revolutionize your infrastructure? Let's start the conversation.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            {/* Glass Card */}
            <div
              className="relative rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-500/20 via-transparent to-cyan-500/20" />

              {/* Form Content */}
              <div className="relative z-10 p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                          errors.name ? 'border-red-500/50' : 'border-white/20'
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.name}
                        </p>
                      )}
                    </motion.div>

                    <motion.div variants={inputVariants} whileFocus="focus">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 ${
                          errors.email ? 'border-red-500/50' : 'border-white/20'
                        }`}
                        placeholder="john@company.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                          <AlertCircle size={14} />
                          {errors.email}
                        </p>
                      )}
                    </motion.div>
                  </div>

                  {/* Company & Role Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <motion.div variants={inputVariants} whileFocus="focus">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                        placeholder="Your Company"
                      />
                    </motion.div>

                    <motion.div variants={inputVariants} whileFocus="focus">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
                        placeholder="CEO, Developer, etc."
                      />
                    </motion.div>
                  </div>

                  {/* Message */}
                  <motion.div variants={inputVariants} whileFocus="focus">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={5}
                      className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-400 backdrop-blur-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 resize-none ${
                        errors.message ? 'border-red-500/50' : 'border-white/20'
                      }`}
                      placeholder="Tell us about your project, questions, or how we can help..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-red-400 text-sm flex items-center gap-1">
                        <AlertCircle size={14} />
                        {errors.message}
                      </p>
                    )}
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={formStatus === 'loading'}
                  >
                    {formStatus === 'loading' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : formStatus === 'success' ? (
                      <>
                        <CheckCircle size={20} />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </div>

              {/* Glassmorphism Shine Effect */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,
                    rgba(255,255,255,0.1) 0%,
                    rgba(255,255,255,0.05) 25%,
                    transparent 50%,
                    rgba(255,255,255,0.05) 75%,
                    rgba(255,255,255,0.1) 100%)`
                }}
              />
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            variants={itemVariants}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Other ways to reach us</h3>
              
              {contactInfo.map((info, index) => {
                const IconComponent = info.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    variants={itemVariants}
                    transition={{ delay: index * 0.1 }}
                  >
                    {/* Contact Info Card */}
                    <div
                      className="relative rounded-2xl border border-white/10 p-6 transition-all duration-300 group-hover:border-purple-500/30"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                          <IconComponent size={24} className="text-purple-400" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-2">{info.title}</h4>
                          <div className="space-y-1">
                            {info.details.map((detail, detailIndex) => (
                              <p key={detailIndex} className="text-gray-300 font-medium">
                                {detail}
                              </p>
                            ))}
                          </div>
                          <p className="text-gray-400 text-sm mt-2">{info.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flowHorizontal {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }
        
        @keyframes flowVertical {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          20% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
          80% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
      `}</style>
    </section>
  );
};

export default ContactSection;

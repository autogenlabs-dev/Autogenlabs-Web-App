'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Star, Plus, Code, Zap, Globe, Shield } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '../../../contexts/AuthContext';

const TemplateLibraryHero = () => {
  const { user, isAuthenticated } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Production Ready",
      description: "All templates are tested and production-ready"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for performance and speed"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Modern Stack",
      description: "Built with latest technologies and frameworks"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Security best practices implemented"
    }
  ];

  return (
    <section className="relative w-full min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white overflow-hidden mt-0">
      
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 pt-32 pb-24">
        
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Left Side - Main Content */}
          <motion.div className="space-y-8" variants={itemVariants}>

            {/* Brand Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-full text-sm font-medium text-purple-300"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              Trusted by 10,000+ developers worldwide
            </motion.div>            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                variants={itemVariants}
              >
                Build Faster with{' '}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Premium Templates
                </span>
              </motion.h1>

              <motion.p
                className="text-base md:text-lg text-gray-400 leading-relaxed max-w-2xl"
                variants={itemVariants}
              >
                Ship your next project in days, not months. Choose from our curated collection of
                production-ready templates and focus on what matters most.
              </motion.p>
            </div>            {/* CTA Buttons */}
          

            {/* Stats */}
            <motion.div
              className="flex gap-8 pt-6 border-t border-white/10"
              variants={itemVariants}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">50+</div>
                <div className="text-sm text-gray-400">Premium Templates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">10k+</div>
                <div className="text-sm text-gray-400">Happy Developers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-1">99.9%</div>
                <div className="text-sm text-gray-400">Uptime SLA</div>
              </div>
            </motion.div>
          </motion.div>          {/* Right Side - Interactive Preview */}
          <motion.div className="lg:justify-self-end w-full flex justify-center lg:justify-end px-4 lg:px-0 lg:mt-0 mt-8" variants={itemVariants}>
            <div className="relative w-full max-w-md mx-4 lg:mx-0">
              {/* Main Preview Card */}
              <div
                className="relative w-full rounded-2xl border border-white/20 overflow-hidden shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Card Header */}
                <div className="relative h-36 bg-gradient-to-br from-purple-600/80 via-pink-600/80 to-cyan-600/80 p-4">

                  {/* Header Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between">                    {/* Top Row */}
                    <div className="flex justify-between items-start">
                      <div className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <span className="text-white text-xs font-medium">Featured</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-white text-sm font-medium">4.9</span>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        SaaS Dashboard Pro
                      </h3>
                      <p className="text-white/80 text-sm mb-3">
                        Complete dashboard with analytics, user management, and billing
                      </p>
                      <div className="flex items-center gap-2">
                        <div className="px-2 py-1 bg-white/20 rounded-md text-xs text-white">React</div>
                        <div className="px-2 py-1 bg-white/20 rounded-md text-xs text-white">TypeScript</div>
                        <div className="px-2 py-1 bg-white/20 rounded-md text-xs text-white">Tailwind</div>
                      </div>
                    </div>
                  </div>

                  {/* Animated Background */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full" style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: '20px 20px'
                    }} />
                  </div>
                </div>                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    {[
                      { name: 'Dashboard Analytics', progress: 100, color: 'bg-green-400' },
                      { name: 'User Management', progress: 85, color: 'bg-blue-400' },
                      { name: 'Payment Integration', progress: 92, color: 'bg-purple-400' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-sm font-medium">{item.name}</span>
                          <span className="text-gray-400 text-xs">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-1.5">
                          <motion.div
                            className={`h-1.5 rounded-full ${item.color}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div>
                      <div className="text-xl font-bold text-white">₹2,999</div>
                      <div className="text-xs text-gray-400">One-time purchase</div>
                    </div>
                    <motion.button
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-cyan-700 text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Preview
                    </motion.button>
                  </div>
                </div>
              </div>              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-pink-500/20 to-rose-500/20 rounded-full border border-pink-500/30 flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4 text-white" />
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TemplateLibraryHero;

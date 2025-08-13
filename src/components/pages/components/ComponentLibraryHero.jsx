'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Star, Code, Layers, Puzzle, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { mockUser } from '@/lib/componentData';

const ComponentLibraryHero = () => {
  const user = mockUser;

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
      icon: <Layers className="w-6 h-6" />,
      title: "Modular Design",
      description: "Build faster with reusable components"
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Easy Integration",
      description: "Drop-in components that work seamlessly"
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Production Ready",
      description: "Battle-tested components for real projects"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Modern Stack",
      description: "Built with latest frameworks and tools"
    }
  ];

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />

        {/* Component-themed decorations */}
        <div className="absolute top-32 left-20 w-16 h-16 border-2 border-blue-500/30 rounded-lg rotate-12 animate-pulse" />
        <div className="absolute top-48 right-32 w-12 h-12 border-2 border-purple-500/30 rounded-full animate-bounce" />
        <div className="absolute bottom-40 left-32 w-20 h-20 border-2 border-cyan-500/30 rounded-lg rotate-45" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      {/* Main Content */}
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
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-full text-sm font-medium text-blue-300"
              variants={itemVariants}
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              500+ premium components available
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                variants={itemVariants}
              >
                Build UI Faster with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  Premium Components
                </span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-xl"
                variants={itemVariants}
              >
                Ready-to-use UI components for your next project. Copy, paste, and customize beautiful components built with modern frameworks.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              className="flex flex-wrap items-center gap-6"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-[#040406] flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-400">2,000+ developers using</span>
              </div>

              <div className="flex items-center gap-1">
                <div className="flex text-yellow-400">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">4.9/5 rating</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={itemVariants}
            >
              <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center gap-2">
                Browse Components
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              
            </motion.div>

            {/* Features Grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 pt-8"
              variants={itemVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-blue-400 flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Visual Elements */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            {/* Component Preview Mockup */}
            <div className="relative">
              {/* Main Card */}
              <motion.div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 shadow-2xl"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="space-y-6">
                  {/* Mock Navigation */}
                  <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg" />
                      <div className="space-y-1">
                        <div className="w-16 h-2 bg-white/30 rounded" />
                        <div className="w-12 h-1.5 bg-white/20 rounded" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-white/20 rounded" />
                      <div className="w-6 h-6 bg-white/20 rounded" />
                    </div>
                  </div>

                  {/* Mock Cards */}
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        className="p-4 bg-white/5 rounded-lg border border-white/10"
                        animate={{
                          scale: [1, 1.02, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-full h-16 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded mb-3" />
                        <div className="space-y-2">
                          <div className="w-full h-2 bg-white/30 rounded" />
                          <div className="w-3/4 h-1.5 bg-white/20 rounded" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mock Form */}
                  <div className="space-y-3">
                    <div className="w-full h-10 bg-white/10 rounded-lg border border-white/20" />
                    <div className="w-full h-10 bg-white/10 rounded-lg border border-white/20" />
                    <div className="w-32 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg ml-auto" />
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />

                <motion.div
                  className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg rotate-12"
                  animate={{
                    rotate: [12, 24, 12],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Background Decorations */}
              <div className="absolute -z-10 inset-0">
                <div className="absolute top-8 right-8 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-xl" />
                <div className="absolute bottom-8 left-8 w-24 h-24 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-xl" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentLibraryHero;

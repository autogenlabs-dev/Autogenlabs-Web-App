'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbnailImage } from '../ui/OptimizedImage';

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Lead Developer",
      company: "TechFlow Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
      fallbackImage: "/logoAuto.webp", // Local fallback
      quote: "The deployment process is incredibly smooth. We went from manual deployments taking hours to automated deployments in minutes. The infrastructure management is seamless."
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "CTO",
      company: "StartupVenture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
      fallbackImage: "/logoAuto.webp", // Local fallback
      quote: "Railway has transformed how we think about DevOps. The simplicity of connecting services and databases without complex configuration is game-changing for our small team."
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "Full Stack Engineer",
      company: "DataSphere",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
      quote: "I love how quickly I can spin up new environments. The automatic SSL, custom domains, and built-in monitoring save us countless hours every week."
    },
    {
      id: 4,
      name: "David Park",
      role: "DevOps Engineer",
      company: "CloudNative Solutions",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
      quote: "The networking capabilities are outstanding. Service discovery and inter-service communication just work out of the box. No more complex networking configurations."
    },
    {
      id: 5,
      name: "Priya Patel",
      role: "Product Manager",
      company: "InnovateLabs",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face&auto=format&q=80",
      quote: "From prototype to production, Railway handles our entire development lifecycle. The team collaboration features and deployment previews are incredibly valuable."
    }
  ];

  // Auto-advance testimonials
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const cardStackVariants = {
    active: {
      scale: 1,
      rotate: 0,
      x: 0,
      y: 0,
      z: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    inactive: (index) => ({
      scale: 1 - (index * 0.08),
      rotate: (index * 3) - 1.5,
      x: index * 15,
      y: index * 20,
      z: -index * 10,
      opacity: 0.9 - (index * 0.15),
      transition: { duration: 0.5, ease: "easeOut" }
    }),
    exit: {
      scale: 0.8,
      rotate: -15,
      x: -200,
      y: -100,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeIn" }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <section className='max-w-[1864px] text-left px-5 py-16 md:py-20 mx-auto relative overflow-hidden'>
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#07060B] via-[#0A090E] to-[#0D0B12]" />
      
      {/* Glassmorphism Background */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Trusted by Developers
        </motion.h2>
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          See what developers and teams are saying about their experience
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Stacked Cards */}
          <div className="relative">
            <div className="relative w-96 h-[450px] mx-auto perspective-1000">
              <AnimatePresence mode="popLayout">
                {testimonials.map((testimonial, index) => {
                  const relativeIndex = (index - currentIndex + testimonials.length) % testimonials.length;
                  const isActive = relativeIndex === 0;
                  const isVisible = relativeIndex < 5; // Show 5 cards in stack
                  
                  if (!isVisible) return null;

                  return (
                    <motion.div
                      key={testimonial.id}
                      className="absolute inset-0 cursor-pointer"
                      variants={cardStackVariants}
                      initial="inactive"
                      animate={isActive ? "active" : "inactive"}
                      exit="exit"
                      custom={relativeIndex}
                      style={{ zIndex: 20 - relativeIndex }}
                      onClick={isActive ? nextTestimonial : undefined}
                      layoutId={`card-${testimonial.id}`}
                    >
                      {/* Glass Card */}
                      <div
                        className={`w-full h-full rounded-3xl border overflow-hidden 
                          ${isActive 
                            ? 'border-white/30 shadow-2xl shadow-purple-500/20' 
                            : 'border-white/15 shadow-xl shadow-black/30'
                          }`}
                        style={{
                          background: isActive
                            ? `linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 100%)`
                            : `linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%)`,
                          backdropFilter: isActive ? "blur(20px)" : "blur(15px)",
                        }}
                      >
                        {/* Optimized Profile Image */}
                        <div className="relative h-64 overflow-hidden">
                          <ThumbnailImage
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={384}
                            height={256}
                            className="w-full h-full object-cover"
                            priority={isActive && relativeIndex === 0}
                            quality={85}
                            sizes="(max-width: 768px) 100vw, 384px"
                            fallback={() => (
                              <div className="w-full h-full bg-gradient-to-br from-purple-600/20 to-cyan-600/20 flex items-center justify-center">
                                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                  <span className="text-2xl font-bold text-white">
                                    {testimonial.name.charAt(0)}
                                  </span>
                                </div>
                              </div>
                            )}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Card Info */}
                        <div className="p-6 text-center">
                          <h3 className="text-xl font-semibold text-white mb-1">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-gray-400 mb-1">
                            {testimonial.role}
                          </p>
                          <p className="text-xs text-purple-400">
                            {testimonial.company}
                          </p>
                        </div>

                        {/* Glass Shine Effect */}
                        {isActive && (
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
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side - Testimonial Content */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                {/* Quote */}
                <div className="relative">
                  <div className="text-6xl text-purple-500/30 font-serif absolute -top-4 -left-2">"</div>
                  <blockquote className="text-xl md:text-2xl text-gray-300 leading-relaxed pl-8">
                    {testimonials[currentIndex].quote}
                  </blockquote>
                  <div className="text-6xl text-purple-500/30 font-serif absolute -bottom-8 right-0">"</div>
                </div>

                {/* Author Info */}
                <div className="pl-8">
                  <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-pink-500 mb-4"></div>
                  <h4 className="text-lg font-semibold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Progress Indicator */}
              <div className="flex gap-2 ml-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setIsAutoPlaying(false);
                      setTimeout(() => setIsAutoPlaying(true), 10000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 
                      ${index === currentIndex 
                        ? 'bg-purple-500 w-8' 
                        : 'bg-white/30 hover:bg-white/50'
                      }`}
                  />
                ))}
              </div>

              {/* Auto-play Indicator */}
              <div className="ml-auto text-xs text-gray-500">
                {isAutoPlaying ? 'Auto-playing' : 'Paused'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for 3D perspective */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
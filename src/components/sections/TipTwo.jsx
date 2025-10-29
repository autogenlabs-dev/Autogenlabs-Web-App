'use client';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import Image from 'next/image';

// Main Component Showcase with train and track
export default function TipTwo() {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [trainY, setTrainY] = useState(0);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    if (isClient && containerRef.current) {
      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollHeight = containerRef.current.scrollHeight;
          const viewportHeight = window.innerHeight;
          
          const progress = Math.max(0, Math.min(1,
            (viewportHeight - rect.top) / (scrollHeight + viewportHeight)
          ));
          
          setTrainY(100 + (progress * 350));
        }
      };
      
      handleScroll();
      
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isClient]);
  

  return (
    <section ref={containerRef} className="relative w-full bg-black py-24 overflow-hidden min-h-screen">
      {/* Track and Train Container - Positioned on the right */}
      <div className="absolute right-0 top-0 w-35 h-full flex justify-center">
        
        {/* Track */}
        <div className="relative w-full h-full flex justify-center">
          {/* Center Rail Gradient - Vertical track */}
          <div className="absolute inset-0 w-full h-full flex items-start justify-center">
            <div className="h-10/12 w-[4px] md:w-[6px] bg-[linear-gradient(180deg,#08070C_0%,rgba(194,41,138,0.8)_40%,rgba(194,41,138,0.8)_70%,#08070C_120%)]"></div>
          </div>
        </div>
        
        {/* Animated Train */}
        <motion.div
          className="absolute left-1/2 top-0 z-20 transform -translate-x-1/2"
          style={{ y: trainY }}
        >
          {/* Train SVG */}
          <Image 
            width={180}
            height={260} 
            loading="lazy"
            src="/train2.svg" 
            alt="Railway train"
            style={{left:"-90px"}}
            className="w-[120px] h-[260px] md:w-[180px] max-w-fit scrollable-train hidden md:block absolute z-10"
          />
        </motion.div>
      </div>

      {/* Curved Track Extension - Right to Left */}
      <div className="absolute bottom-0 right-0 w-full h-full overflow-visible pointer-events-none">
        <svg
          className="absolute w-full h-full"
          viewBox="-595 50 2020 790"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="rightCurveGradient" x1="100%" y1="0%" x2="50%" y2="0%">
              <stop offset="0%" stopColor="rgba(194,41,138,0.3)" stopOpacity="0.3" />
              <stop offset="70%" stopColor="rgba(194,41,138,0.6)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgba(194,41,138,0.3)" stopOpacity="1" />
            </linearGradient>
            <linearGradient id="leftCurveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(194,41,138,0.3)" stopOpacity="1" />
              <stop offset="70%" stopColor="rgba(194,41,138,0.6)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgba(194,41,138,0.3)" stopOpacity="1" />
            </linearGradient>
          </defs>
          
          {/* Horizontal curved track - Right to Left (Extended) */}
          <path
            d="M1330 760 Q1330 800 1280 800 L-330 800"
            stroke="url(#rightCurveGradient)"
            strokeWidth="4"
            fill="none"
            className="drop-shadow-lg"
          />
          
          {/* Downward curved track - From Left (Extended) */}
          <path
  d="M-330 800 Q-330 800 -350 850 L-350 1200"
  stroke="url(#leftCurveGradient)"
  strokeWidth="4"
  fill="none"
  className="drop-shadow-lg"
/>
          
          {/* Glow effects (Extended) */}
          <path
  d="M-330 800 Q-330 800 -350 850 L-350 1200" 
  stroke="rgba(194,41,138,.4)"
  strokeWidth="8"
  fill="none"
  className="blur-sm"
/>
          
          <path
            d="M-330 800 Q-330 800 -350 850 L-350 1200"
            stroke="rgba(194,41,138,.4)"
            strokeWidth="8"
            fill="none"
            className="blur-sm"
          />
        </svg>
      </div>

      {/* Content - Flipped Layout */}
      <div className="relative z-30 mr-35 pr-8 pl-8 h-full flex flex-col justify-center py-20">
        
        {/* Main Content - Split Layout (Video Left, Text Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto items-center">
          
          {/* Left Side - Video Player */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            {/* Video Container */}
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20"
              style={{
                background: 'linear-gradient(135deg, rgba(139,92,246,0.8) 0%, rgba(6,182,212,0.6) 50%, rgba(236,72,153,0.8) 100%)',
              }}
            >
              {/* Video Placeholder */}
              <div className="relative aspect-video bg-black/20 flex items-center justify-center">
                {/* Play Button */}
                <motion.button
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={32} className="text-white ml-1" fill="currentColor" />
                </motion.button>
                
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
              </div>
              
              {/* Video Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <h4 className="text-white font-bold text-lg mb-2">
                  Visual Studio prompt engineering with Codemurf
                </h4>
                <p className="text-gray-300 text-sm">
                  Codemurf for Visual Studio 2022
                </p>
              </div>
              
              {/* Glassmorphism Shine Effect */}
              <div 
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, 
                    rgba(255,255,255,0.2) 0%, 
                    rgba(255,255,255,0.1) 25%, 
                    transparent 50%, 
                    rgba(255,255,255,0.1) 75%, 
                    rgba(255,255,255,0.2) 100%)`
                }}
              />
            </div>
          </motion.div>

          {/* Right Side - Text Content */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            {/* Step Number and Title */}
            <div>
              <div className="text-8xl font-bold text-purple-400/30 leading-none mb-4">02</div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Prompt like a pro
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
              The quality of the output of any Large Language Model depends largely on the quality of the prompt, and Codemurf is no exception. In this new video, Gwyn teaches about “prompt engineering” for Codemurf in Visual Studio 2022, and how to create better results with better prompts.
              </p>
              
              {/* Link */}
              <motion.a
                href="#"
                className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition-colors"
                whileHover={{ x: 5 }}
              >
                View all demos
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

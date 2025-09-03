'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { DynamicVideoSection } from '../dynamic/DynamicComponents';
import { FastLoader } from '../ui/OptimizedLoader';

const CopilotUIComponent = () => {
  const [userName, setUserName] = useState('Akarsh'); // Dynamic user name
  const [isLoaded, setIsLoaded] = useState(false);
  const [placeholderText, setPlaceholderText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const placeholderTexts = [
    "Build me a React component for user authentication...",
    "Create an API endpoint for user management...", 
    "Generate a responsive dashboard layout...",
    "Help me optimize this React application...",
    "Write unit tests for my components...",
    "Build a real-time chat application..."
  ];

  useEffect(() => {
    // Immediate load for better first impression
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const currentPhrase = placeholderTexts[currentIndex];
    
    if (placeholderText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setPlaceholderText(currentPhrase.slice(0, placeholderText.length + 1));
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setPlaceholderText('');
        setCurrentIndex((prev) => (prev + 1) % placeholderTexts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [placeholderText, currentIndex, placeholderTexts]);
  
  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Main Chat Interface */}
      <section className="rounded-2xl border border-white/10 bg-neutral-900/40 backdrop-filter backdrop-blur-lg shadow-2xl relative overflow-hidden">
        {/* Animated SVG Border */}
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 pointer-events-none">
          <rect
            rx="16"
            ry="16"
            className="animate-border-dash"
            height="100%"
            width="100%"
            strokeLinejoin="round"
            fill="transparent"
            stroke="rgba(78, 255, 13, 0.3)"
            strokeWidth="1"
            strokeDasharray="260"
          />
        </svg>
        
        {/* Header */}
        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 border-b border-white/10 relative z-10">
          <div className="flex items-center gap-3 text-sm text-neutral-300">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-amber-400/20 text-amber-300">
              🚀
            </span>
            <span className="font-medium">Codemurf AI Assistant</span>
            <span className="hidden sm:inline text-neutral-400">Build powerful applications with AI-driven code generation</span>
          </div>
          <button 
            className="inline-flex items-center gap-2 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black hover:bg-amber-300 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            onClick={() => window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank')}
          >
            Get now
          </button>
        </div>

        {/* Main Input Area */}
        <div className="px-4 sm:px-6 relative z-10">
          <div className="relative">
            <textarea
              placeholder={placeholderText + (placeholderText ? '|' : '')}
              className="w-full resize-none bg-transparent outline-none placeholder-neutral-500 text-base sm:text-lg leading-7 h-32 pt-4 text-white"
            />            <div className="absolute inset-x-0 bottom-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
                  📎
                </button>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 h-9 hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span className="text-sm">Connect GitHub</span>
                </button>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 h-9 hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-white text-[11px]">A</span>
                  <span className="text-sm">A‑1</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 h-9 hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-500/20 text-pink-300">
                    🤖
                  </span>
                  <span className="text-sm">Codemurf 4.0</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button className="h-9 w-9 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-200 transform hover:scale-105">
                  🎤
                </button>
                <button className="h-10 w-10 inline-flex items-center justify-center rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-200 transform hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Buttons */}
      <motion.div
        className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
      >
        <motion.button
          className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : -20 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          onClick={() => window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank')}
        >
          Download in Visual Studio
        </motion.button>
        <motion.button
          className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-medium border border-gray-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isLoaded ? 1 : 0, x: isLoaded ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          onClick={() => window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank')}
        >
          Get Started
        </motion.button>
      </motion.div>

      <style jsx>{`
        @keyframes borderDash {
          from {
            stroke-dashoffset: 0;
          }
          to {
            stroke-dashoffset: 1000;
          }
        }
        .animate-border-dash {
          animation: borderDash 2.5s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Scale animation - starts small and scales up as you scroll
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1]);
  // Optional: Add some opacity fade-in effect
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);
  // Optional: Add Y movement for parallax effect - starts higher up
  const y = useTransform(scrollYProgress, [0, 1], [-100, -50]);

  // Trigger initial animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[linear-gradient(180deg,_#040406_50%,_#09080D_100%)] text-white relative flex flex-col justify-between items-center">
      {/* Circuit Board Background - Only in Hero Section */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* Static Circuit Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='circuit' x='0' y='0' width='300' height='300' patternUnits='userSpaceOnUse'%3E%3Cg fill='none' stroke='%234ade80' stroke-width='0.4'%3E%3Cline x1='30' y1='75' x2='120' y2='75'/%3E%3Cline x1='180' y1='75' x2='270' y2='75'/%3E%3Cline x1='60' y1='150' x2='150' y2='150'/%3E%3Cline x1='210' y1='150' x2='300' y2='150'/%3E%3Cline x1='0' y1='225' x2='90' y2='225'/%3E%3Cline x1='180' y1='225' x2='270' y2='225'/%3E%3Cline x1='75' y1='30' x2='75' y2='120'/%3E%3Cline x1='75' y1='180' x2='75' y2='270'/%3E%3Cline x1='150' y1='60' x2='150' y2='150'/%3E%3Cline x1='225' y1='0' x2='225' y2='90'/%3E%3Cline x1='225' y1='180' x2='225' y2='300'/%3E%3Cpath d='M120,75 L150,75 L150,105'/%3E%3Cpath d='M150,150 L180,150 L180,180'/%3E%3Cpath d='M90,225 L120,225 L120,195'/%3E%3Ccircle cx='75' cy='75' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3Ccircle cx='150' cy='150' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3Ccircle cx='225' cy='225' r='2' fill='%234ade80' fill-opacity='0.3'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23circuit)'/%3E%3C/svg%3E")`
          }}
        />

        {/* Animated Current Flow Lines */}
        <div className="absolute inset-0">
          {/* Horizontal flowing lines */}
          <div className="absolute top-[25%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-20 animate-pulse"
            style={{ animation: 'flowHorizontal 8s ease-in-out infinite', animationDelay: '0s' }} />
          <div className="absolute top-[50%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-green-400/30 to-transparent opacity-20"
            style={{ animation: 'flowHorizontal 12s ease-in-out infinite', animationDelay: '2s' }} />
          <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent opacity-20"
            style={{ animation: 'flowHorizontal 10s ease-in-out infinite', animationDelay: '4s' }} />

          {/* Vertical flowing lines */}
          <div className="absolute left-[25%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-green-400/30 to-transparent opacity-20"
            style={{ animation: 'flowVertical 9s ease-in-out infinite', animationDelay: '1s' }} />
          <div className="absolute left-[50%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent opacity-20"
            style={{ animation: 'flowVertical 11s ease-in-out infinite', animationDelay: '3s' }} />
          <div className="absolute left-[75%] top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-green-400/30 to-transparent opacity-20"
            style={{ animation: 'flowVertical 13s ease-in-out infinite', animationDelay: '5s' }} />
        </div>

        {/* Pulsing Connection Points */}
        <div className="absolute inset-0">
          <div className="absolute top-[25%] left-[25%] w-2 h-2 bg-green-400/40 rounded-full"
            style={{ animation: 'pulse 3s ease-in-out infinite' }} />
          <div className="absolute top-[50%] left-[50%] w-2 h-2 bg-cyan-400/40 rounded-full"
            style={{ animation: 'pulse 4s ease-in-out infinite', animationDelay: '1s' }} />
          <div className="absolute top-[75%] left-[75%] w-2 h-2 bg-green-400/40 rounded-full"
            style={{ animation: 'pulse 5s ease-in-out infinite', animationDelay: '2s' }} />
          <div className="absolute top-[30%] left-[70%] w-1.5 h-1.5 bg-cyan-400/30 rounded-full"
            style={{ animation: 'pulse 3.5s ease-in-out infinite', animationDelay: '0.5s' }} />
          <div className="absolute top-[60%] left-[30%] w-1.5 h-1.5 bg-green-400/30 rounded-full"
            style={{ animation: 'pulse 4.5s ease-in-out infinite', animationDelay: '1.5s' }} />
        </div>

        {/* Gentle Glow */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s' }} />
        </div>
      </motion.div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes flowHorizontal {
          0% { transform: translateX(-100%); opacity: 0; }
          20% { opacity: 0.3; }
          50% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        @keyframes flowVertical {
          0% { transform: translateY(-100%); opacity: 0; }
          20% { opacity: 0.3; }
          50% { opacity: 0.6; }
          80% { opacity: 0.3; }
          100% { transform: translateY(100%); opacity: 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.5); }
        }
        /* Static brand highlight for 'Codemurf' */
        .brand-highlight {
          background: linear-gradient(90deg,#34d399,#06b6d4,#3b82f6);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          filter: drop-shadow(0 0 6px rgba(56,189,248,0.35));
        }
      `}</style>

      <motion.section
        className="relative z-10 px-8 md:px-44 pt-32 pb-8 min-h-11/12 flex items-center justify-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col justify-start h-full items-start w-full md:max-w-5xl mx-auto">
          {/* Tagline replacing previous Welcome heading */}
          <motion.h1
            className="font-black tracking-tight leading-tight mb-6 text-left select-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {/* Line 1 (single light color) */}
            {/* <span className="block text-[36px] sm:text-[44px] md:text-[52px] xl:text-[56px] font-semibold text-neutral-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.18)] whitespace-nowrap max-w-full tracking-tight">
              From concept to completion in a click.
            </span> */}
            {/* Line 2 (same color) */}
            <span className="block mt-2 text-[36px] sm:text-[44px] md:text-[52px] xl:text-[56px] font-semibold text-neutral-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.18)] whitespace-nowrap max-w-full">
              Let's <span className="brand-highlight font-semibold">Build</span> a website without coding.
            </span>
          </motion.h1>

          {/* Removed old secondary heading & centered layout */}

          {/* Emergent-style Chat Interface */}
          <motion.div
            className="mb-8 flex items-start justify-start w-full"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{
              opacity: isLoaded ? 1 : 0,
              y: isLoaded ? 0 : 50,
              scale: isLoaded ? 1 : 0.9
            }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <CopilotUIComponent />
          </motion.div>

        </div>
      </motion.section>

      {/* Video Section - Load immediately */}
      <motion.div
        className="flex justify-center items-center w-10/12 mt-10 p-10 border-2 border-amber-50 rounded-3xl relative z-10"
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 100,
          scale: isLoaded ? 1 : 0.8
        }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <FastLoader>
          <DynamicVideoSection />
        </FastLoader>
      </motion.div>
    </div>
  );
}

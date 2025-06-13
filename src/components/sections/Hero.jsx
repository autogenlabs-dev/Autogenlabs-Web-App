'use client'
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Paperclip, Mic, Send, ChevronDown, FileText, Globe } from 'lucide-react';
import { DynamicVideoSection } from '@/components/dynamic/DynamicComponents';
import { LazyVideo } from '@/components/ui/LazyLoader';

const CopilotUIComponent = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const typewriterTexts = [
    "How can I optimize this React component?",
    "Explain this JavaScript function...",
    "Help me debug this code issue",
    "Generate a responsive CSS layout",
    "Create a REST API endpoint",
    "Write unit tests for this function"
  ];

  useEffect(() => {
    const currentPhrase = typewriterTexts[currentIndex];
    if (currentText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentText('');
        setCurrentIndex((prev) => (prev + 1) % typewriterTexts.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [currentText, currentIndex, typewriterTexts]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#1e1e1e] rounded-lg border border-gray-700 overflow-hidden shadow-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#2d2d30] border-b border-gray-700">
        {/* Left Side - Add Context Button */}
        <button className="flex items-center gap-2 px-3 py-1.5 bg-[#3c3c3c] hover:bg-[#464647] rounded text-gray-300 text-sm transition-colors">
          <Paperclip size={14} />
          <span>Add Context...</span>
        </button>


        {/* Right Side - Icons */}
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-[#3c3c3c] rounded text-gray-400 hover:text-gray-300 transition-colors">
            <Globe size={16} />
          </button>
          <button className="p-1.5 hover:bg-[#3c3c3c] rounded text-gray-400 hover:text-gray-300 transition-colors">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-[#252526] p-4">
        <div className="flex items-center gap-3">
          {/* @ Symbol */}
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <span className="text-lg font-medium">@</span>
          </button>

          {/* Microphone Icon */}
          <button className="text-gray-400 hover:text-gray-300 transition-colors">
            <Mic size={18} />
          </button>

          {/* Input Field with Typewriter Effect */}
          <div className="flex-1 relative">
            <div className="bg-[#3c3c3c] rounded-lg px-4 py-3 min-h-[44px] flex items-center">
              <span className="text-gray-300">
                {currentText}
                <span className="animate-pulse text-blue-400">|</span>
              </span>
            </div>
          </div>

          {/* Model Selector */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#3c3c3c] rounded-lg text-gray-300 text-sm">
            <span>Ask</span>
            <div className="w-px h-4 bg-gray-600"></div>
            <span className="font-medium">AutoGen AI</span>
            <ChevronDown size={14} />
          </div>

          {/* Send Button */}
          <motion.button
            className="p-2.5 bg-[#0e639c] hover:bg-[#1177bb] rounded-lg text-white transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send size={16} />
          </motion.button>
        </div>

        {/* Footer Text */}
        <div className="text-xs text-gray-500 mt-3 text-center">
          AutoGen AI can help with deployment, scaling, and infrastructure optimization.
        </div>
      </div>
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
      `}</style>

      <motion.section
        className="relative z-10 px-8 md:px-44 pt-32 pb-8 min-h-11/12 flex items-center justify-center w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center flex flex-col justify-start h-full items-center w-full">
          <motion.h1
            className="font-tight leading-[1.1875] sm:leading-[1.1875] md:leading-[1.1875] text-[32px] sm:text-5xl md:text-6xl max-w-[900px] font-semibold mb-5 tracking-tight text-center w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            AutoGen Labs Free in Visual Studio 2025
          </motion.h1>

          {/* Copilot UI Component - Load immediately */}
          <motion.div
            className="mb-8 flex items-start justify-center w-full"
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

          {/* Animated Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
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
              onClick={() => window.location.href = '/docs'}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      {/* Lazy-loaded Video Section */}
      <motion.div
        className="flex justify-center items-center w-10/12 mt-10 p-10 border-2 border-amber-50 rounded-3xl relative z-10"
        style={{ scale, opacity, y }}
        initial={{ opacity: 0, y: 100, scale: 0.8 }}
        animate={{
          opacity: isLoaded ? 1 : 0,
          y: isLoaded ? 0 : 100,
          scale: isLoaded ? 1 : 0.8
        }}
        transition={{ duration: 1.2, delay: 1.6, ease: "easeOut" }}
      >
        <LazyVideo delay={3000}>
          <DynamicVideoSection />
        </LazyVideo>
      </motion.div>
    </div>
  );
}
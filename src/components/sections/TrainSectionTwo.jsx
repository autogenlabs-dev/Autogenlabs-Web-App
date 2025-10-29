'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import SafeImage from '../ui/SafeImage';
import { useRef, useState, useEffect } from 'react';

const MasonryImageCard = ({ src, alt, className = "", height = "h-64", delay = 0, priority = false }) => {
  const [imageError, setImageError] = useState(false);
  
  // Fallback gradient based on image ID
  const getGradientColor = (alt) => {
    const gradients = [
      'from-blue-500 to-purple-600',
      'from-green-500 to-teal-600', 
      'from-orange-500 to-red-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
      'from-yellow-500 to-orange-600',
      'from-purple-500 to-pink-600',
      'from-teal-500 to-green-600'
    ];
    const index = alt.length % gradients.length;
    return gradients[index];
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      className={`relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden ${height} ${className}`}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <motion.div
        className="relative w-full h-full"
        initial={{ scale: 1.2 }}
        whileInView={{ scale: 1 }}
        transition={{
          duration: 1.2,
          delay: delay + 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        viewport={{ once: true }}
      >
        {imageError ? (
          // Fallback gradient background
          <div className={`w-full h-full bg-gradient-to-br ${getGradientColor(alt)} flex items-center justify-center`}>
            <div className="text-white text-center px-4">
              <div className="w-12 h-12 mx-auto mb-2 opacity-70">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenOdd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenOdd" />
                </svg>
              </div>
              <p className="text-xs opacity-80 font-medium">{alt}</p>
            </div>
          </div>        ) : (
          <SafeImage
            src={src}
            alt={alt}
            fill={true}
            className="object-cover"
            priority={priority}
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={handleImageError}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

// Main Component
export default function TrainSectionTwo() {
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
          
          setTrainY(20 + (progress * 230));
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

  const masonryItems = [
    { 
      id: 1, 
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format&q=80", 
      alt: "Create Account Interface", 
      height: "h-48", 
      delay: 0,
      priority: true 
    },
    { 
      id: 2, 
      src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=600&fit=crop&auto=format&q=80", 
      alt: "Sign In Interface", 
      height: "h-80", 
      delay: 0.1,
      priority: true 
    },
    { 
      id: 3, 
      src: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&h=500&fit=crop&auto=format&q=80", 
      alt: "Dashboard Overview", 
      height: "h-56", 
      delay: 0.2,
      priority: false 
    },
    { 
      id: 4, 
      src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=700&fit=crop&auto=format&q=80", 
      alt: "User Profile", 
      height: "h-96", 
      delay: 0.3,
      priority: false 
    },
    { 
      id: 5, 
      src: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=600&h=350&fit=crop&auto=format&q=80", 
      alt: "Settings Panel", 
      height: "h-40", 
      delay: 0.4,
      priority: false 
    },
    { 
      id: 6, 
      src: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=550&fit=crop&auto=format&q=80", 
      alt: "Analytics Dashboard", 
      height: "h-72", 
      delay: 0.5,
      priority: false 
    },
    { 
      id: 7, 
      src: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=500&fit=crop&auto=format&q=80", 
      alt: "Team Management", 
      height: "h-64", 
      delay: 0.6,
      priority: false 
    },
    { 
      id: 8, 
      src: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&h=650&fit=crop&auto=format&q=80", 
      alt: "Security Settings", 
      height: "h-88", 
      delay: 0.7,
      priority: false 
    },
    { 
      id: 9, 
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&auto=format&q=80", 
      alt: "Email Verification", 
      height: "h-48", 
      delay: 0.8,
      priority: false 
    },
    { 
      id: 10, 
      src: "https://images.unsplash.com/photo-1551808525-51a94da548ce?w=600&h=600&fit=crop&auto=format&q=80", 
      alt: "Payment Methods", 
      height: "h-80", 
      delay: 0.9,
      priority: false 
    },
    { 
      id: 11, 
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=450&fit=crop&auto=format&q=80", 
      alt: "Notifications", 
      height: "h-56", 
      delay: 1.0,
      priority: false 
    },
    { 
      id: 12, 
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=550&fit=crop&auto=format&q=80", 
      alt: "API Keys", 
      height: "h-72", 
      delay: 1.1,
      priority: false 
    },
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-black py-24 overflow-hidden">
      {/* Track and Train Container - Positioned on the right */}
      <div className="absolute right-0 top-0 w-35 h-full flex justify-center">
        {/* Track */}
        <div className="relative w-full h-full flex justify-center">
          {/* Center Rail Gradient - Vertical track */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <div className="h-10/12 w-1 md:w-1.5 bg-gradient-to-b from-[#08070C] via-[rgba(202,36,77,0.8)] to-[#08070C]"></div>
          </div>
        </div>
        
        {/* Animated Train */}
        <motion.div
          className="absolute left-1/2 top-0 z-20 transform -translate-x-1/2"
          style={{ y: trainY }}
        >
          {/* Optimized Train SVG */}
          <Image
            width={180}
            height={260}
            src="/train1.svg"
            alt="Railway train"
            style={{left:"-90px"}}
            className="w-[120px] h-[260px] md:w-[180px] max-w-fit scrollable-train hidden md:block absolute z-10"
            priority={false}
            loading="lazy"
          />
        </motion.div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          className="max-w-7xl mx-auto px-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h4 className="text-purple-400 font-medium mb-4">Railway Components</h4>
          <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6">
            Pixel-perfect UIs, embedded in minutes
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl">
            Simply add <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-purple-400">&lt;SignIn/&gt;</code>, <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-purple-400">&lt;SignUp/&gt;</code>, <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-purple-400">&lt;UserButton/&gt;</code>, <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-purple-400">&lt;UserProfile/&gt;</code> for complete user management functionality. Match to your brand with any CSS library, then deploy to your own domain — no more jarring redirects!
          </p>
        </motion.div>

        {/* Optimized Masonry Container with Edge Clipping */}
        <div className="relative overflow-hidden">
          <div className="lg:px-24">
            {/* Extended container for edge clipping */}
            <div className="relative -mx-16 md:-mx-24 lg:-mx-32">
              {/* Masonry Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-min">
                {masonryItems.map((item) => (
                  <MasonryImageCard
                    key={item.id}
                    src={item.src}
                    alt={item.alt}
                    height={item.height}
                    delay={item.delay}
                    priority={item.priority}
                    className="w-full"
                  />
                ))}
              </div>

              {/* Left Edge Fade */}
              <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-10" />
              
              {/* Right Edge Fade */}
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 lg:w-32 bg-gradient-to-l from-black via-black/80 to-transparent pointer-events-none z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for additional height classes */}
      <style jsx>{`
        .h-88 {
          height: 22rem; /* 352px */
        }
      `}</style>
    </section>
  );
}

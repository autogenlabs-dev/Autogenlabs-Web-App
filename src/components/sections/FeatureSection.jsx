'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const FeatureSection = () => {
  const [hoveredCard, setHoveredCard] = useState('frontend');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [screenSize, setScreenSize] = useState('lg');
  const [isClient, setIsClient] = useState(false);
  const [debugInfo, setDebugInfo] = useState({}); // Debug information
  const containerRef = useRef(null);
  
  // Only initialize scroll hooks after component is hydrated
  const [scrollYProgress, setScrollYProgress] = useState(null);
  const [trainY, setTrainY] = useState(0);
  
  useEffect(() => {
    if (isClient && containerRef.current) {
      // Create a simple scroll listener instead of useScroll to avoid hydration issues
      const handleScroll = () => {
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          const scrollHeight = containerRef.current.scrollHeight;
          const viewportHeight = window.innerHeight;
          
          // Calculate scroll progress (0 to 1)
          const progress = Math.max(0, Math.min(1,
            (viewportHeight - rect.top) / (scrollHeight + viewportHeight)
          ));
          
          setScrollYProgress(progress);
          setTrainY(100 + (progress * 300)); // Map progress to train movement
        }
      };
      
      // Initial calculation
      handleScroll();
      
      // Add scroll listener
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
      };
    }
  }, [isClient]);

  // Screen size detection with multiple methods
  useEffect(() => {
    setIsClient(true);
    
    const detectScreenSize = () => {
      if (typeof window === 'undefined') return 'lg';
      
      // Method 1: window.innerWidth
      const windowWidth = window.innerWidth;
      
      // Method 2: document.documentElement.clientWidth
      const documentWidth = document.documentElement.clientWidth;
      
      // Method 3: screen.width
      const screenWidth = window.screen.width;
      
      // Method 4: CSS media query matching
      const mediaQueries = {
        sm: window.matchMedia('(max-width: 639px)').matches,
        md: window.matchMedia('(min-width: 640px) and (max-width: 767px)').matches,
        lg: window.matchMedia('(min-width: 768px) and (max-width: 1029px)').matches,
        xl: window.matchMedia('(min-width: 1030px) and (max-width: 1999px)').matches,
        xxl: window.matchMedia('(min-width: 1440px)').matches
      };
      
      // Get the active media query
      const cssBreakpoint = Object.entries(mediaQueries).find(([key, matches]) => matches)?.[0] || 'lg';
      
      // Debug information
      const debug = {
        windowWidth,
        documentWidth,
        screenWidth,
        devicePixelRatio: window.devicePixelRatio,
        userAgent: navigator.userAgent,
        cssBreakpoint,
        mediaQueries,
        timestamp: new Date().toISOString(),
        location: window.location.href
      };
      
      setDebugInfo(debug);
      
      // Log comprehensive debug info
      console.log('🔍 Screen Detection Debug:', debug);
      
      let detectedSize = cssBreakpoint;
      
      // Fallback to window.innerWidth if CSS method fails
      if (!detectedSize || detectedSize === 'lg') {
        if (windowWidth < 640) detectedSize = 'sm';
        else if (windowWidth < 768) detectedSize = 'md';
        else if (windowWidth < 1030) detectedSize = 'lg';
        else if (windowWidth < 1440) detectedSize = 'xl';
        else detectedSize = 'xxl';
      }
      
      console.log(`📱 Final detected size: ${detectedSize} (window: ${windowWidth}px, css: ${cssBreakpoint})`);
      
      return detectedSize;
    };

    const checkScreenSize = () => {
      const newSize = detectScreenSize();
      if (newSize !== screenSize) {
        console.log(`🔄 Screen size changed: ${screenSize} → ${newSize}`);
        setScreenSize(newSize);
      }
    };

    // Initial check with delay to ensure DOM is ready
    const initialTimer = setTimeout(checkScreenSize, 100);
    
    // Also check immediately
    checkScreenSize();
    
    // Listen for resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Additional check for orientation changes
    window.addEventListener('orientationchange', () => {
      setTimeout(checkScreenSize, 100);
    });

    return () => {
      clearTimeout(initialTimer);
      window.removeEventListener('resize', checkScreenSize);
      window.removeEventListener('orientationchange', checkScreenSize);
    };
  }, []);


  // Debug logging
  useEffect(() => {
    if (isClient) {
      console.log('🚀 Component State:', { 
        isClient, 
        screenSize, 
        environment: process.env.NODE_ENV,
        isVercel: !!process.env.VERCEL,
        debugInfo 
      });
    }
  }, [isClient, screenSize, debugInfo]);

  // Responsive positions for each service card
  const responsivePositions = {
    frontend: {
      sm: { left: 50, top: 15, width: 200, height: 120 },
      md: { left: 45, top: 20, width: 220, height: 140 },
      lg: { left: 40, top: 75, width: 256, height: 176 },
      xl: { left: 43, top: 65, width: 220, height: 140 },
      xxl: { left: 42, top: 140, width: 400, height: 270 }
    },
    apiGateway: {
      sm: { left: 80, top: 30, width: 180, height: 110 },
      md: { left: 75, top: 35, width: 200, height: 130 },
      lg: { left: 70, top: 0, width: 256, height: 176 },
      xl: { left: 70, top: -2, width: 220, height: 140 },
      xxl: { left: 72, top: 14, width: 400, height: 270 }
    },
    backend: {
      sm: { left: 85, top: 70, width: 180, height: 110 },
      md: { left: 80, top: 65, width: 200, height: 130 },
      lg: { left: 83, top: 35, width: 256, height: 176 },
      xl: { left: 82, top: 28, width: 220, height: 140 },
      xxl: { left: 82, top: 75, width: 400, height: 270 }
    },
    postgres: {
      sm: { left: 15, top: 85, width: 180, height: 110 },
      md: { left: 12, top: 80, width: 200, height: 130 },
      lg: { left: 10, top: 75, width: 256, height: 176 },
      xl: { left: 12, top: 65, width: 220, height: 140 },
      xxl: { left: 12, top: 140, width: 400, height: 270 }
    },
    redis: {
      sm: { left: 75, top: 85, width: 180, height: 110 },
      md: { left: 70, top: 80, width: 200, height: 130 },
      lg: { left: 70, top: 75, width: 256, height: 176 },
      xl: { left: 72, top: 65, width: 220, height: 140 },
      xxl: { left: 70, top: 140, width: 400, height: 270 }
    },
    monitoring: {
      sm: { left: 15, top: 45, width: 180, height: 110 },
      md: { left: 12, top: 40, width: 200, height: 130 },
      lg: { left: 4, top: 28, width: 256, height: 176 },
      xl: { left: 5, top: 26, width: 220, height: 140 },
      xxl: { left: 6, top: 70, width: 400, height: 270 }
    }
  };

  // Get responsive position for a service
  const getResponsivePosition = (serviceKey) => {
    return responsivePositions[serviceKey]?.[screenSize] || responsivePositions[serviceKey]?.lg;
  };

  const cardDataWithGridPositions = {
    frontend: { gridPosition: { x: 700, y: 40 } },
    apiGateway: { gridPosition: { x: 1050, y: 180 } },
    backend: { gridPosition: { x: 1050, y: 320 } },
    postgres: { gridPosition: { x: 300, y: 480 } },
    redis: { gridPosition: { x: 1100, y: 490 } },
    monitoring: { gridPosition: { x: 120, y: 300 } }
  };

  const cardData = {
    frontend: {
      title: "frontend",
      url: "frontend-prod.up.railway.app",
      icon: "🌐",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=220&fit=crop",
      color: "rgba(255,193,7,1)"
    },
    apiGateway: {
      title: "api-gateway",
      url: "api-prod.up.railway.app",
      icon: "🔗",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=300&h=220&fit=crop",
      color: "rgba(79,172,254,1)"
    },
    backend: {
      title: "backend",
      url: "backend-prod.up.railway.app",
      icon: "⚙️",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1666875753105-c63a6f3bdc86?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=300&h=220&fit=crop",
      color: "rgba(34,197,94,1)"
    },
    postgres: {
      title: "postgres",
      url: "pg-data",
      icon: "🐘",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=220&fit=crop",
      color: "rgba(139,92,246,1)"
    },
    redis: {
      title: "redis-cache",
      url: "redis-prod.up.railway.app",
      icon: "🔴",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=300&h=220&fit=crop",
      color: "rgba(245,101,101,1)"
    },
    monitoring: {
      title: "monitoring",
      url: "monitor-prod.up.railway.app",
      icon: "📈",
      status: "Just deployed",
      images: [
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
      ],
      preview: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=220&fit=crop",
      color: "rgba(168,85,247,1)"
    }
  };

  // Hub points
  const hubPoints = {
    topHub: { x: 700, y: 200 },
    leftHub: { x: 350, y: 300 },
    rightHub: { x: 1050, y: 300 },
    bottomHub: { x: 700, y: 400 }
  };

  const centerPoint = { x: 700, y: 300 };

  // Auto-advance carousel during hover
  useEffect(() => {
    if (!hoveredCard) return;

    const interval = setInterval(() => {
      setCurrentImageIndex(prev => 
        (prev + 1) % cardData[hoveredCard].images.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [hoveredCard]);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [hoveredCard]);

  const handleCardHover = (cardKey) => {
    setHoveredCard(cardKey);
  };

  const serviceCardVariants = {
    initial: { scale: 0.95, opacity: 0.8 },
    hover: { 
      scale: 0.9, 
      opacity: 0.5,
      filter: "blur(3px)",
      transition: { duration: 0.3 }
    },
    normal: { 
      scale: 0.95, 
      opacity: 0.8,
      filter: "blur(0px)",
      transition: { duration: 0.3 }
    }
  };

  const centerCardVariants = {
    initial: { scale: 0.95 },
    animate: { scale: 1, transition: { duration: 0.5 } }
  };

  const imageVariants = {
    enter: { opacity: 0, scale: 1.1 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 }
  };

  const getResponsiveViewBox = () => {
    return "0 0 1400 600"; 
  };

  if (!isClient) {
    return (
      <section className='w-full text-left px-2 md:px-8 py-5 md:py-0 mx-auto md:rounded-2xl border-y md:border-x border-white/10 bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] relative h-[100vh] overflow-hidden'>
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(100,100,100,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,100,100,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="relative z-10 text-center pt-8 pb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            Application Infrastructure
          </h2>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Linear microservices network with grid-based routing
          </p>
        </div>
        
        <div className="relative z-10 h-[500px] w-full flex justify-center items-center">
          <div className="w-96 h-72 bg-gray-900/90 backdrop-blur-sm border border-gray-700/70 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 text-sm">Detecting screen size...</p>
              <p className="text-gray-500 text-xs mt-2">Initializing responsive layout</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className='w-full text-left px-2 md:px-8 py-5 md:py-0 mx-auto md:rounded-2xl border-y md:border-x border-white/10 bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] relative h-[100vh] overflow-hidden'>
      


      {/* Track and Train Container */}
      <div className={`absolute left-0 top-0 w-96 h-full justify-center ${screenSize === 'sm' ? 'hidden' : 'flex'}`}>
        
        {/* Background Track SVG */}
        <div className="relative w-full h-full flex justify-start">
          
          {/* Center Rail Gradient */}
          <div className="absolute inset-0 w-full h-full flex items-center justify-start left-10">
            <div className=" h-10/12 w-1 md:w-1.5 bg-gradient-to-b from-[#08070C] via-[rgba(202,36,77,0.8)] to-[#08070C]"></div>
          </div>
        </div>
        
        {/* Animated Train */}
        <motion.div
          className="absolute left-10 top-0 z-20 transform -translate-x-1/2"
          style={{ y: trainY }}
        >
          
          {/* Train SVG */}
          <Image 
            src="/train1.svg" 
            alt="Railway train"
            style={{left:"-88px"}}
            className="w-[120px] h-[260px] md:w-[180px] max-w-fit scrollable-train hidden md:block absolute z-10"
            width={180}
            height={260}
            loading="lazy"
            priority={false}
          />
        </motion.div>
      </div>

      {/* Curved Track Extension */}
      {screenSize !== 'sm' && (
        <div className="absolute left-0 top-0 w-full h-full overflow-visible pointer-events-none">
          <svg
            className="absolute w-full h-full"
            viewBox="100 -220 2800 800"
            fill="none"
            xmlns="http://www.w3.org/1440/svg"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="50%" y2="0%">
                <stop offset="0%" stopColor="rgba(202,36,77,0.3)" stopOpacity="0.3" />
                <stop offset="70%" stopColor="rgba(202,36,77,0.6)" stopOpacity="1" />
                <stop offset="100%" stopColor="rgba(202,36,77,0.3)" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="downCurveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(202,36,77,0.3)" stopOpacity="1" />
                <stop offset="70%" stopColor="rgba(202,36,77,0.6)" stopOpacity="1" />
                <stop offset="100%" stopColor="rgba(202,36,77,0.3)" stopOpacity="1" />
              </linearGradient>
            </defs>
            
            {/* Horizontal curved track */}
            <path
              d="M192 760 Q192 800 242 800 L1400 800"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              fill="none"
              className="drop-shadow-lg"
            />
            
            {/* Downward curved track */}
            <path
              d="M1400 800 Q1450 800 1450 850 L1450 1000"
              stroke="url(#downCurveGradient)"
              strokeWidth="4"
              fill="none"
              className="drop-shadow-lg"
            />
            
            {/* Glow effects */}
            <path
              d="M192 760 Q192 800 242 800 L1400 800"
              stroke="rgba(202,36,77,.4)"
              strokeWidth="8"
              fill="none"
              className="blur-sm"
            />
            
            <path
              d="M1400 800 Q1450 800 1450 850 L1450 1000"
              stroke="rgba(202,36,77,.4)"
              strokeWidth="8"
              fill="none"
              className="blur-sm"
            />
          </svg>
        </div>
      )}

      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(100,100,100,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100,100,100,0.1) 1px, transparent 1px)
          `,
          backgroundSize: screenSize === 'sm' ? '20px 20px' : '40px 40px'
        }} />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center pt-8 pb-6">
        <h2 className={`font-bold text-white mb-3 ${
          screenSize === 'sm' ? 'text-2xl' : 'text-3xl md:text-4xl'
        }`}>
          Application Infrastructure
        </h2>
        <p className={`text-gray-400 max-w-xl mx-auto ${
          screenSize === 'sm' ? 'text-sm' : 'text-base'
        }`}>
          Linear microservices network with grid-based routing
        </p>
      </div>

      {/* Linear Network Connections */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full" viewBox={getResponsiveViewBox()} fill="none">
          <defs>
            {/* Connection gradients */}
            {Object.entries(cardData).map(([key, card]) => (
              <linearGradient key={key} id={`track-${key}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={card.color.replace('1)', '0.3)')} />
                <stop offset="50%" stopColor={card.color} />
                <stop offset="100%" stopColor={card.color.replace('1)', '0.3)')} />
              </linearGradient>
            ))}
          </defs>

          {/* Hub Circles  */}
          <circle
            cx={hubPoints.topHub.x}
            cy={hubPoints.topHub.y + 220}
            r="10"
            fill={hoveredCard === 'frontend' ? cardData.frontend.color : 'rgba(100,100,100,0.3)'}
            className="transition-all duration-300"
          />
          <circle
            cx={hubPoints.leftHub.x - 30}
            cy={hubPoints.leftHub.y}
            r="10"
            fill={hoveredCard === 'monitoring' ? cardData.monitoring.color : 'rgba(100,100,100,0.3)'}
            className="transition-all duration-300"
          />
          <circle
            cx={hubPoints.rightHub.x + 30}
            cy={hubPoints.rightHub.y}
            r="10"
            fill={hoveredCard === 'apiGateway' || hoveredCard === 'backend' ? 'rgba(100,200,255,0.8)' : 'rgba(100,100,100,0.3)'}
            className="transition-all duration-300"
          />
          <circle
            cx={hubPoints.bottomHub.x}
            cy={hubPoints.bottomHub.y + 20}
            r="10"
            fill={hoveredCard === 'postgres' || hoveredCard === 'redis' ? 'rgba(200,100,255,0.8)' : 'rgba(100,100,100,0.3)'}
            className="transition-all duration-300"
          />

          {/* Center Hub  */}
          <circle
            cx={centerPoint.x}
            cy={centerPoint.y}
            r="16"
            fill="rgba(100,150,255,0.8)"
            stroke="rgba(100,150,255,1)"
            strokeWidth="4"
            className="drop-shadow-lg"
          />

          {/* Linear Connections - Frontend  */}
          <line
            x1={cardDataWithGridPositions.frontend.gridPosition.x}
            y1={cardDataWithGridPositions.frontend.gridPosition.y + 400}
            x2={cardDataWithGridPositions.frontend.gridPosition.x} y2={hubPoints.topHub.y - 20}
            stroke={hoveredCard === 'frontend' ? cardData.frontend.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'frontend' ? '5' : '2.5'}
            strokeDasharray="6,3"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.topHub.x} y1={hubPoints.topHub.y - 20}
            x2={centerPoint.x} y2={centerPoint.y}
            stroke={hoveredCard === 'frontend' ? cardData.frontend.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'frontend' ? '5' : '2.5'}
            strokeDasharray="6,3"
            className="transition-all duration-300"
          />

          {/* Linear Connections - API Gateway */}
          <line
            x1={cardDataWithGridPositions.apiGateway.gridPosition.x }
            y1={cardDataWithGridPositions.apiGateway.gridPosition.y}
            x2={hubPoints.rightHub.x }
            y2={cardDataWithGridPositions.apiGateway.gridPosition.y}
            stroke={hoveredCard === 'apiGateway' ? cardData.apiGateway.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'apiGateway' ? '5' : '2.5'}
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.rightHub.x + 30}
            y1={cardDataWithGridPositions.apiGateway.gridPosition.y + 50}
            x2={hubPoints.rightHub.x + 30} y2={hubPoints.rightHub.y}
            stroke={hoveredCard === 'apiGateway' ? cardData.apiGateway.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'apiGateway' ? '5' : '2.5'}
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.rightHub.x + 30} y1={hubPoints.rightHub.y}
            x2={centerPoint.x} y2={centerPoint.y}
            stroke={hoveredCard === 'apiGateway' ? cardData.apiGateway.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'apiGateway' ? '5' : '2.5'}
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />

          {/* Linear Connections - Backend  */}
          <line
            x1={cardDataWithGridPositions.backend.gridPosition.x + 30}
            y1={cardDataWithGridPositions.backend.gridPosition.y -20}
            x2={hubPoints.rightHub.x + 100}
            y2={cardDataWithGridPositions.backend.gridPosition.y -20}
            stroke={hoveredCard === 'backend' ? cardData.backend.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'backend' ? '5' : '2.5'}
            strokeDasharray="12,6"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.rightHub.x + 30}
            y1={cardDataWithGridPositions.backend.gridPosition.y}
            x2={hubPoints.rightHub.x + 30} y2={hubPoints.rightHub.y}
            stroke={hoveredCard === 'backend' ? cardData.backend.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'backend' ? '5' : '2.5'}
            strokeDasharray="12,6"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.rightHub.x + 30} y1={hubPoints.rightHub.y}
            x2={centerPoint.x} y2={centerPoint.y}
            stroke={hoveredCard === 'backend' ? cardData.backend.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'backend' ? '5' : '2.5'}
            strokeDasharray="12,6"
            className="transition-all duration-300"
          />

          {/* Linear Connections - Postgres */}
          <line
            x1={cardDataWithGridPositions.postgres.gridPosition.x}
            y1={cardDataWithGridPositions.postgres.gridPosition.y - 50}
            x2={cardDataWithGridPositions.postgres.gridPosition.x}
            y2={hubPoints.bottomHub.y + 20}
            stroke={hoveredCard === 'postgres' ? cardData.postgres.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'postgres' ? '5' : '2.5'}
            strokeDasharray="6,3"
            className="transition-all duration-300"
          />
          <line
            x1={cardDataWithGridPositions.postgres.gridPosition.x}
            y1={hubPoints.bottomHub.y + 20}
            x2={centerPoint.x} y2={hubPoints.bottomHub.y + 20}
            stroke={hoveredCard === 'postgres' ? cardData.postgres.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'postgres' ? '5' : '2.5'}
            strokeDasharray="6,3"
            className="transition-all duration-300"
          />
          <line
            x1={centerPoint.x} y1={hubPoints.bottomHub.y + 20}
            x2={centerPoint.x} y2={centerPoint.y}
            stroke={hoveredCard === 'postgres' ? cardData.postgres.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'postgres' ? '5' : '2.5'}
            strokeDasharray="6,3"
            className="transition-all duration-300"
          />

          {/* Linear Connections - Redis */}
          <line
            x1={cardDataWithGridPositions.redis.gridPosition.x}
            y1={cardDataWithGridPositions.redis.gridPosition.y - 50}
            x2={cardDataWithGridPositions.redis.gridPosition.x} y2={hubPoints.bottomHub.y + 20}
            stroke={hoveredCard === 'redis' ? cardData.redis.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'redis' ? '5' : '2.5'}
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />
          <line
            x1={cardDataWithGridPositions.redis.gridPosition.x} y1={hubPoints.bottomHub.y + 20}
            x2={centerPoint.x} y2={hubPoints.bottomHub.y + 20}
            stroke={hoveredCard === 'redis' ? cardData.redis.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'redis' ? '5' : '2.5'}
            strokeDasharray="8,4"
            className="transition-all duration-300"
          />

          {/* Linear Connections - Monitoring  */}
          <line
            x1={cardDataWithGridPositions.monitoring.gridPosition.x + 200}
            y1={cardDataWithGridPositions.monitoring.gridPosition.y}
            x2={hubPoints.leftHub.x - 30}
            y2={cardDataWithGridPositions.monitoring.gridPosition.y}
            stroke={hoveredCard === 'monitoring' ? cardData.monitoring.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'monitoring' ? '5' : '2.5'}
            strokeDasharray="10,5"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.leftHub.x - 30}
            y1={cardDataWithGridPositions.monitoring.gridPosition.y}
            x2={hubPoints.leftHub.x - 30} y2={hubPoints.leftHub.y}
            stroke={hoveredCard === 'monitoring' ? cardData.monitoring.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'monitoring' ? '5' : '2.5'}
            strokeDasharray="10,5"
            className="transition-all duration-300"
          />
          <line
            x1={hubPoints.leftHub.x - 30} y1={hubPoints.leftHub.y}
            x2={centerPoint.x} y2={centerPoint.y}
            stroke={hoveredCard === 'monitoring' ? cardData.monitoring.color : 'rgba(100,100,100,0.2)'}
            strokeWidth={hoveredCard === 'monitoring' ? '5' : '2.5'}
            strokeDasharray="10,5"
            className="transition-all duration-300"
          />
        </svg>
      </div>

      {/* Cards Container */}
      <div className={`relative z-10 w-full flex justify-center items-start ${
        screenSize === 'sm' ? 'h-[400px]' : 'h-[500px]'
      }`}>
        
        {/* Center Display Card */}
        <motion.div 
          className={`bg-gray-900/90 backdrop-blur-sm border border-gray-700/70 rounded-3xl overflow-hidden shadow-2xl ${
            screenSize === 'sm' ? 'w-72 h-48' : screenSize === 'md' ? 'w-80 h-56' : 'w-96 h-72'
          }`}
          variants={centerCardVariants}
          initial="initial"
          animate="animate"
        >
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${hoveredCard}-${currentImageIndex}`}
                src={cardData[hoveredCard]?.images[currentImageIndex]}
                alt="Service showcase"
                className="w-full h-full object-cover"
                variants={imageVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                loading="lazy"
              />
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 md:p-6">
              <h3 className={`text-white font-bold mb-2 ${
                screenSize === 'sm' ? 'text-lg' : 'text-xl'
              }`}>
                {cardData[hoveredCard]?.title}
              </h3>
              <p className={`text-gray-300 mb-4 ${
                screenSize === 'sm' ? 'text-sm' : 'text-base'
              }`}>
                {cardData[hoveredCard]?.url}
              </p>
              <div className="flex space-x-2">
                {cardData[hoveredCard]?.images.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? 'bg-white w-8' : 'bg-white/40 w-4'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grid-Positioned Service Cards */}
        {Object.entries(cardData).map(([key, service]) => {
          const position = getResponsivePosition(key);
          
          return (
            <motion.div
              key={key}
              className="absolute bg-gray-900/80 backdrop-blur-sm border border-gray-700/60 rounded-2xl overflow-hidden cursor-pointer"
              style={{
                left: `${position.left}%`,
                top: `${position.top}%`,
                width: `${position.width}px`,
                height: `${position.height}px`,
                transform: 'translate(-50%, -50%)'
              }}
              variants={serviceCardVariants}
              initial="normal"
              animate={hoveredCard === key ? 'hover' : 'normal'}
              onMouseEnter={() => handleCardHover(key)}
            >
              {/* Preview Image */}
              <div className="relative w-full h-full">
                <Image
                  src={service.preview}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  width={position.width}
                  height={position.height}
                  loading="lazy"
                />
                
                {/* Overlay with service info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  {/* Service icon and title at top */}
                  <div className="absolute top-2 md:top-4 left-2 md:left-4 flex items-center gap-2 md:gap-3">
                    <span className={screenSize === 'sm' ? 'text-base' : 'text-xl'}>{service.icon}</span>
                    <span className={`text-white font-semibold ${
                      screenSize === 'sm' ? 'text-xs' : 'text-base'
                    }`}>{service.title}</span>
                  </div>
                  
                  {/* Status at bottom */}
                  <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
                    <div className="flex items-center gap-2">
                      <div className={`rounded-full bg-green-500 ${
                        screenSize === 'sm' ? 'w-2 h-2' : 'w-3 h-3'
                      }`}></div>
                      <span className={`text-green-400 font-medium ${
                        screenSize === 'sm' ? 'text-xs' : 'text-sm'
                      }`}>{service.status}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection Highlight Effect */}
              {hoveredCard === key && (
                <div className="absolute inset-0 border-2 border-opacity-60 rounded-2xl pointer-events-none"
                     style={{ borderColor: service.color }} />
              )}
            </motion.div>
          );
        })}

      </div>
    </section>
  );
};

export default FeatureSection;

'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Loader } from 'lucide-react';

const VideoSection = () => {
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Immediate loading for better performance
  useEffect(() => {
    // Load video immediately
    setIsInView(true);
  }, []);

  // Handle video loaded
  const handleVideoLoaded = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  // Handle video error
  const handleVideoError = () => {
    console.warn('Video failed to load, showing fallback');
    setHasError(true);
    setIsLoaded(true); // Still consider it "loaded" to show fallback
  };

  // Handle video play
  const handlePlay = async () => {
    if (videoRef.current && isLoaded) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.log('Autoplay prevented:', error);
        setShowPlayButton(true);
      }
    }
  };

  // Handle manual play button click
  const handlePlayButtonClick = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      } catch (error) {
        console.error('Error playing video:', error);
      }
    }
  };

  // Auto-play when video is loaded and in view
  useEffect(() => {
    if (isLoaded && isInView) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        handlePlay();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isInView]);

  return (
    <div ref={containerRef} className="relative w-full h-full rounded-3xl overflow-hidden">
      {/* Loading State */}
      {!isLoaded && isInView && (
        <motion.div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm rounded-3xl z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={40} className="text-purple-400" />
            </motion.div>
            <p className="text-white text-sm">Loading video...</p>
          </div>
        </motion.div>
      )}

      {/* Placeholder before in view */}
      {!isInView && (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-3xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
            <p className="text-gray-400 text-sm">Video will load when visible</p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-cyan-900/20 rounded-3xl flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center mb-4 mx-auto">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
            <p className="text-gray-400 text-sm">Video demo available</p>
            <button
              className="mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
              onClick={() => window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank')}
            >
              Try VS Code Extension
            </button>
          </div>
        </div>
      )}

      {/* Lazy-loaded Video */}
      {isInView && (
        <motion.div
          className="relative w-full h-full"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {!hasError && (
            <video
              ref={videoRef}
              loop
              muted
              playsInline
              preload="metadata" // Only load metadata initially
              className={`w-full h-full object-cover rounded-3xl transition-opacity duration-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={handleVideoLoaded}
              onCanPlay={() => setIsLoaded(true)}
              onError={handleVideoError}
            >
              <source
                src="https://cdn.builder.io/o/assets%2FYJIGb4i01jvw0SRdL5Bt%2F1f879747f3c14418917a193e0f9b2de8%2Fcompressed?apiKey=YJIGb4i01jvw0SRdL5Bt&token=1f879747f3c14418917a193e0f9b2de8&alt=media&optimized=true"
                type="video/mp4"
              />
              {/* Fallback for browsers that don't support video */}
              <div className="w-full h-full bg-gray-800 rounded-3xl flex items-center justify-center">
                <p className="text-white">Your browser doesn't support video playback.</p>
              </div>
            </video>
          )}

          {/* Manual Play Button - shows if autoplay fails */}
          {showPlayButton && isLoaded && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl cursor-pointer z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handlePlayButtonClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300">
                <Play size={32} className="text-white ml-1" fill="currentColor" />
              </div>
            </motion.div>
          )}

          {/* Video Controls Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Codemurf Platform Demo</span>
            </div>
            <div className="px-2 py-1 bg-black/50 rounded text-xs">
              {isPlaying ? 'Playing' : 'Paused'}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VideoSection;

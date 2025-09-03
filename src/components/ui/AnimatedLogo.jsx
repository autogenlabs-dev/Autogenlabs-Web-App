'use client';
import React, { useState, useEffect } from 'react';

const AnimatedLogo = ({ className = "", size = 40 }) => {
  const [currentDot, setCurrentDot] = useState(0);

  useEffect(() => {
    // Dot animation cycle - slower and smoother
    const dotInterval = setInterval(() => {
      setCurrentDot((prev) => (prev + 1) % 4);
    }, 800);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  const getDotColor = (index) => {
    if (index === currentDot) {
      return '#6B7280'; // Grey when active (animation color)
    }
    return '#ffffff'; // White when inactive (default color)
  };

  return (
    <div className={`flex items-center ${className}`}>
      {/* Animated Dots Logo */}
      <div className="relative mr-3">
        <svg width={size} height={size} viewBox="0 0 40 40" className="transition-all duration-300">
          {/* Top dot */}
          <circle 
            cx="20" 
            cy="8" 
            r="4" 
            fill={getDotColor(0)}
            className="transition-all duration-500 ease-in-out"
          />
          {/* Left dot */}
          <circle 
            cx="8" 
            cy="20" 
            r="4" 
            fill={getDotColor(1)}
            className="transition-all duration-500 ease-in-out"
          />
          {/* Bottom dot */}
          <circle 
            cx="20" 
            cy="32" 
            r="4" 
            fill={getDotColor(2)}
            className="transition-all duration-500 ease-in-out"
          />
          {/* Right dot */}
          <circle 
            cx="32" 
            cy="20" 
            r="4" 
            fill={getDotColor(3)}
            className="transition-all duration-500 ease-in-out"
          />
        </svg>
      </div>

      {/* Simple Codemurf Text */}
      <span className="text-2xl font-semibold text-white">Codemurf</span>
    </div>
  );
};

export default AnimatedLogo;


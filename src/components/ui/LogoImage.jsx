'use client';
import Image from 'next/image';

/**
 * LogoImage component that handles aspect ratio automatically
 * Prevents the Next.js warning about modified width/height
 */
const LogoImage = ({ 
  src, 
  alt, 
  width, 
  height, 
  className = '', 
  priority = false,
  style = {},
  ...props 
}) => {
  // Automatically handle aspect ratio for logo images
  const logoStyle = {
    width: 'auto',
    height: 'auto',
    maxWidth: width,
    maxHeight: height,
    ...style
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={logoStyle}
      {...props}
    />
  );
};

export default LogoImage;


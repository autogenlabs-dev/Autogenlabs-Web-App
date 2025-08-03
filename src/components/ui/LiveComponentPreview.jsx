'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle, Maximize2 } from 'lucide-react';

const LiveComponentPreview = ({ 
  component, 
  width = '100%', 
  height = '200px',
  className = '',
  theme = 'dark',
  showFallback = true,
  showExpandButton = false,
  onExpand
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [previewContent, setPreviewContent] = useState('');

  useEffect(() => {
    generatePreviewContent();
  }, [component]);

  const generatePreviewContent = () => {
    // Check for different possible code field names
    const codeContent = component?.code || component?.html || component?.content || component?.htmlCode;
    
    if (!component || !codeContent) {
      setHasError(true);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setHasError(false);

      let htmlContent = '';
      let cssContent = '';

      // Check if code is JSON format (HTML + CSS)
      if (component.language?.toLowerCase() === 'css' || 
          component.language?.toLowerCase() === 'html/css') {
        try {
          const parsedCode = JSON.parse(codeContent);
          if (parsedCode.html && parsedCode.css) {
            htmlContent = parsedCode.html;
            cssContent = parsedCode.css;
          } else {
            // If not proper JSON format, treat as HTML
            htmlContent = codeContent;
          }
        } catch (e) {
          // If JSON parsing fails, treat as plain HTML
          htmlContent = codeContent;
        }
      } else {
        // For other languages, treat as HTML
        htmlContent = codeContent;
      }

      // Generate the complete HTML document
      const fullHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Component Preview</title>
          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>
          <!-- Bootstrap CSS -->
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          <!-- Font Awesome -->
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
          <!-- Custom Styles -->
          <style>
            body { 
              margin: 0; 
              padding: 0; 
              font-family: 'Inter', system-ui, -apple-system, sans-serif;
              background-color: ${theme === 'dark' ? '#1f2937' : '#ffffff'};
              color: ${theme === 'dark' ? '#ffffff' : '#000000'};
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }
            html { 
              width: 100%;
              height: 100%;
            }
            * { 
              box-sizing: border-box; 
            }
            .preview-wrapper {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              width: 100%;
              height: 100%;
              padding: 20px;
              max-width: 100%;
              max-height: 100%;
            }
            /* Ensure component content scales properly */
            .preview-wrapper > * {
              max-width: 100%;
              max-height: 100%;
            }
            /* Custom scrollbar for dark theme */
            ::-webkit-scrollbar {
              width: 8px;
            }
            ::-webkit-scrollbar-track {
              background: ${theme === 'dark' ? '#374151' : '#f1f5f9'};
            }
            ::-webkit-scrollbar-thumb {
              background: ${theme === 'dark' ? '#6b7280' : '#cbd5e1'};
              border-radius: 4px;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: ${theme === 'dark' ? '#9ca3af' : '#94a3b8'};
            }
            ${cssContent}
          </style>
        </head>
        <body>
          <div class="preview-wrapper">
            ${htmlContent}
          </div>
          <script>
            // Add any necessary JavaScript for component functionality
            // Handle iframe resizing
            function resizeIframe() {
              const height = Math.max(
                document.body.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.clientHeight,
                document.documentElement.scrollHeight,
                document.documentElement.offsetHeight
              );
              window.parent.postMessage({ 
                type: 'iframe-resize', 
                height: Math.min(height, 1000) // Cap at 1000px
              }, '*');
            }
            
            // Resize on load and content changes
            window.addEventListener('load', resizeIframe);
            window.addEventListener('resize', resizeIframe);
            
            // Observer for dynamic content changes
            if (window.ResizeObserver) {
              const resizeObserver = new ResizeObserver(resizeIframe);
              resizeObserver.observe(document.body);
            }
            
            // Initial resize
            setTimeout(resizeIframe, 100);
          </script>
        </body>
        </html>
      `;

      setPreviewContent(fullHTML);
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  // Fallback when no code or error
  if (hasError || !component?.code) {
    if (!showFallback) return null;
    
    return (
      <div 
        className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-400">
          <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No preview available</p>
          <p className="text-xs opacity-70">{component?.category || 'Component'}</p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div 
        className={`flex items-center justify-center bg-gray-800 rounded-lg ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-400">
          <Loader2 className="w-6 h-6 mx-auto mb-2 animate-spin" />
          <p className="text-sm">Loading preview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative group ${className}`} style={{ width, height }}>
      {/* Live Preview iframe */}
      <iframe
        srcDoc={previewContent}
        className="w-full h-full border-none rounded-lg"
        style={{ 
          width: '100%',
          height: '100%',
          minHeight: height,
          backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
          border: 'none',
          outline: 'none'
        }}
        title={`${component.title} - Live Preview`}
        sandbox="allow-scripts allow-same-origin"
        onLoad={() => setIsLoading(false)}
        onError={() => setHasError(true)}
      />
      
      {/* Expand button overlay */}
      {showExpandButton && onExpand && (
        <motion.button
          onClick={onExpand}
          className="absolute top-2 right-2 p-2 bg-black/50 hover:bg-black/70 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <Maximize2 className="w-4 h-4 text-white" />
        </motion.button>
      )}
      
      {/* Component info overlay (optional) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-b-lg">
        <h4 className="text-white text-sm font-medium truncate">{component.title}</h4>
        <p className="text-gray-300 text-xs">{component.language} • {component.category}</p>
      </div>
    </div>
  );
};

export default LiveComponentPreview;

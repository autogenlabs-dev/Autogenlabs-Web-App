'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Code, Eye, ExternalLink, Download, Copy } from 'lucide-react';
import LiveComponentPreview from './LiveComponentPreview';
import { useState } from 'react';

const LivePreviewModal = ({ isOpen, onClose, component }) => {
  const [viewMode, setViewMode] = useState('preview'); // 'preview' or 'code'
  const [copied, setCopied] = useState(false);

  if (!isOpen || !component) return null;

  const copyToClipboard = async () => {
    try {
      // Check for different possible code field names
      const codeContent = component.code || component.html || component.content || component.htmlCode;
      await navigator.clipboard.writeText(codeContent || '');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const downloadComponent = () => {
    let filename = `${component.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}`;
    // Check for different possible code field names
    let content = component.code || component.html || component.content || component.htmlCode || '';
    let extension = '.html';

    // Handle different formats
    if (component.language?.toLowerCase() === 'css' || 
        component.language?.toLowerCase() === 'html/css') {
      try {
        const parsedCode = JSON.parse(component.code);
        if (parsedCode.html && parsedCode.css) {
          // Create a complete HTML file with embedded CSS
          content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${component.title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    ${parsedCode.css}
  </style>
</head>
<body>
  ${parsedCode.html}
</body>
</html>`;
        }
      } catch (e) {
        // Use as-is if not JSON
      }
    }

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename + extension;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Parse code for display
  // Check for different possible code field names
  let displayCode = component.code || component.html || component.content || component.htmlCode || '';
  let isJsonCode = false;
  let htmlCode = '';
  let cssCode = '';

  try {
    const parsedCode = JSON.parse(displayCode);
    if (parsedCode.html && parsedCode.css) {
      isJsonCode = true;
      htmlCode = parsedCode.html;
      cssCode = parsedCode.css;
      displayCode = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    }
  } catch (e) {
    // Not JSON, use as-is
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-gray-900 rounded-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden border border-gray-700"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">{component.title}</h2>
                <p className="text-gray-400 text-sm">
                  {component.category} • {component.language} • {component.planType}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-700 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'preview' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4 inline mr-1" />
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    viewMode === 'code' 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Code className="w-4 h-4 inline mr-1" />
                  Code
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={copyToClipboard}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Copy Code"
              >
                <Copy className="w-5 h-5" />
              </button>
              
              <button
                onClick={downloadComponent}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                title="Download Component"
              >
                <Download className="w-5 h-5" />
              </button>

              {component.liveDemoUrl && (
                <a
                  href={component.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
              )}

              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {viewMode === 'preview' ? (
              <div className="h-full p-6">
                <LiveComponentPreview
                  component={component}
                  width="100%"
                  height="100%"
                  theme="dark"
                  className="h-full"
                  showFallback={true}
                />
              </div>
            ) : (
              <div className="h-full bg-gray-900">
                {isJsonCode ? (
                  <div className="h-full flex">
                    {/* HTML Section */}
                    <div className="w-1/2 border-r border-gray-700">
                      <div className="p-4 border-b border-gray-700 bg-gray-800">
                        <h3 className="text-white text-sm font-medium">📄 HTML</h3>
                      </div>
                      <textarea
                        value={htmlCode}
                        readOnly
                        className="w-full h-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none border-none"
                        spellCheck="false"
                      />
                    </div>
                    
                    {/* CSS Section */}
                    <div className="w-1/2">
                      <div className="p-4 border-b border-gray-700 bg-gray-800">
                        <h3 className="text-white text-sm font-medium">🎨 CSS</h3>
                      </div>
                      <textarea
                        value={cssCode}
                        readOnly
                        className="w-full h-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none border-none"
                        spellCheck="false"
                      />
                    </div>
                  </div>
                ) : (
                  <textarea
                    value={displayCode}
                    readOnly
                    className="w-full h-full bg-gray-900 text-gray-300 p-4 font-mono text-sm resize-none focus:outline-none border-none"
                    spellCheck="false"
                  />
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                {copied && <span className="text-green-400 mr-4">✅ Code copied to clipboard!</span>}
                Created by <span className="text-white font-medium">{component.developerName}</span>
                {component.createdAt && (
                  <span> • {new Date(component.createdAt).toLocaleDateString()}</span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {component.tags && component.tags.length > 0 && (
                  <div className="flex gap-1">
                    {component.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LivePreviewModal;

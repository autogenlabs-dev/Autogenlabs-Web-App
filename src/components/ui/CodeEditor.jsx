'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Eye, Code, RefreshCw, Sun, Moon } from 'lucide-react';

const CodeEditor = ({ 
  initialCode = '', 
  language = 'html', 
  onCodeChange,
  showPreview = true,
  height = '400px',
  theme = 'light',
  previewBackground = '#ffffff',
  readOnly = false
}) => {
  const [code, setCode] = useState(initialCode);
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [copied, setCopied] = useState(false);
  const [previewTheme, setPreviewTheme] = useState('dark'); // Default to dark theme

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const refreshPreview = () => {
    // Force a re-render of the preview
    setIsPreviewMode(false);
    setTimeout(() => setIsPreviewMode(true), 50);
  };

  const themeColors = theme === 'dark' ? {
    bg: 'bg-gray-900',
    headerBg: 'bg-gray-800',
    border: 'border-gray-700',
    text: 'text-white',
    buttonBg: 'bg-gray-700 hover:bg-gray-600',
    editorBg: 'bg-gray-900',
    editorText: 'text-white'
  } : {
    bg: 'bg-white',
    headerBg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-900',
    buttonBg: 'bg-gray-200 hover:bg-gray-300',
    editorBg: 'bg-white',
    editorText: 'text-gray-900'
  };

  return (
    <div className={`${themeColors.bg} rounded-lg overflow-hidden border ${themeColors.border}`}>
      {/* Header - Simplified for integrated look */}
      <div className={`flex items-center justify-between p-4 ${themeColors.headerBg} border-b ${themeColors.border}`}>
        <div className="flex items-center gap-2">
          <span className={`${themeColors.text} text-lg font-semibold`}>
            Code Editor
          </span>
          <span className={`${themeColors.text} text-sm opacity-70`}>
            ({language.toUpperCase()})
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {showPreview && (
            <>
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  isPreviewMode 
                    ? 'bg-blue-600 text-white' 
                    : `${themeColors.buttonBg} ${themeColors.text}`
                }`}
              >
                <Eye className="w-4 h-4 inline mr-1" />
                Preview
              </button>
              <button
                onClick={() => setIsPreviewMode(false)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  !isPreviewMode 
                    ? 'bg-blue-600 text-white' 
                    : `${themeColors.buttonBg} ${themeColors.text}`
                }`}
              >
                <Code className="w-4 h-4 inline mr-1" />
                Code
              </button>
              <button
                onClick={refreshPreview}
                className={`p-1 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                title="Refresh Preview"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              {/* Preview Theme Toggle */}
              <button
                onClick={() => setPreviewTheme(previewTheme === 'light' ? 'dark' : 'light')}
                className={`p-1 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                title={`Switch to ${previewTheme === 'light' ? 'dark' : 'light'} preview`}
              >
                {previewTheme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </button>
            </>
          )}
          <button
            onClick={copyToClipboard}
            className={`p-1 transition-colors ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </button>
          {copied && (
            <span className="text-green-400 text-sm">Copied!</span>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex" style={{ height }}>
        {/* Code Editor */}
        <div className={`${showPreview && isPreviewMode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
          <textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            readOnly={readOnly}
            className={`w-full h-full ${themeColors.editorBg} ${themeColors.editorText} p-4 font-mono text-sm resize-none focus:outline-none border-none ${readOnly ? 'cursor-default' : ''}`}
            placeholder={`Enter your ${language.toUpperCase()} code here...`}
            spellCheck="false"
          />
        </div>

        {/* Live Preview */}
        {showPreview && isPreviewMode && (
          <div className={`w-1/2 border-l ${themeColors.border}`}>
            <div className={`p-4 ${themeColors.headerBg} border-b ${themeColors.border}`}>
              <h3 className={`${themeColors.text} text-sm font-medium`}>Live Preview</h3>
            </div>
            <div 
              className="h-full overflow-auto" 
              style={{ backgroundColor: previewTheme === 'dark' ? '#1f2937' : previewBackground }}
            >
              <div className="p-0"
                   style={{ backgroundColor: previewTheme === 'dark' ? '#1f2937' : previewBackground }}
              >
                <iframe
                  srcDoc={`
                    <!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <script src="https://cdn.tailwindcss.com"></script>
                      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
                      <style>
                        body { 
                          margin: 0; 
                          padding: 0; 
                          font-family: system-ui, -apple-system, sans-serif;
                          background-color: ${previewTheme === 'dark' ? '#1f2937' : previewBackground};
                          color: ${previewTheme === 'dark' ? '#ffffff' : '#000000'};
                          min-height: 100vh;
                          display: flex;
                          align-items: center;
                          justify-content: center;
                        }
                        * { box-sizing: border-box; }
                        .preview-wrapper {
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          flex-direction: column;
                          width: 100%;
                          min-height: 100vh;
                          padding: 20px;
                        }
                        
                        /* Enhanced CSS Animation Support */
                        @keyframes spin {
                          from { transform: rotate(0deg); }
                          to { transform: rotate(360deg); }
                        }
                        
                        @keyframes pulse {
                          0%, 100% { opacity: 1; }
                          50% { opacity: 0.5; }
                        }
                        
                        @keyframes bounce {
                          0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                          40%, 43% { transform: translateY(-30px); }
                          70% { transform: translateY(-15px); }
                          90% { transform: translateY(-4px); }
                        }
                        
                        @keyframes fadeIn {
                          from { opacity: 0; }
                          to { opacity: 1; }
                        }
                        
                        @keyframes slideIn {
                          from { transform: translateX(-100%); }
                          to { transform: translateX(0); }
                        }
                        
                        /* Common Animation Classes */
                        .animate-spin { animation: spin 1s linear infinite; }
                        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                        .animate-bounce { animation: bounce 1s infinite; }
                        .animate-fade-in { animation: fadeIn 0.5s ease-in; }
                        .animate-slide-in { animation: slideIn 0.5s ease-out; }
                        
                        /* Ensure all animations work */
                        * {
                          animation-play-state: running !important;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="preview-wrapper">
                        ${code}
                      </div>
                      
                      <script>
                        // Ensure animations start immediately
                        document.addEventListener('DOMContentLoaded', function() {
                          // Force repaint to ensure animations work
                          document.body.style.display = 'none';
                          document.body.offsetHeight; // Trigger reflow
                          document.body.style.display = 'flex';
                          
                          // Start any paused animations
                          const animatedElements = document.querySelectorAll('*');
                          animatedElements.forEach(el => {
                            if (getComputedStyle(el).animationName !== 'none') {
                              el.style.animationPlayState = 'running';
                            }
                          });
                        });
                      </script>
                    </body>
                    </html>
                  `}
                  className="w-full h-full border-none"
                  style={{ minHeight: '400px', backgroundColor: previewTheme === 'dark' ? '#1f2937' : previewBackground }}
                  title="Component Preview"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer with helpful tips */}
      <div className={`p-2 ${themeColors.headerBg} border-t ${themeColors.border}`}>
        <div className={`flex items-center justify-between text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          <div className="flex items-center gap-4">
            <span>💡 Tip: Changes auto-update in preview</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Lines: {code.split('\n').length}</span>
            <span>•</span>
            <span>Chars: {code.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;


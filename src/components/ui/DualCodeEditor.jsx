'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Copy, Eye, Code, RefreshCw, Sun, Moon } from 'lucide-react';

const DualCodeEditor = ({ 
  initialHtmlCode = '', 
  initialCssCode = '',
  onHtmlCodeChange,
  onCssCodeChange,
  showPreview = true,
  height = '600px',
  theme = 'light',
  previewBackground = '#ffffff',
  readOnly = false
}) => {
  const [htmlCode, setHtmlCode] = useState(initialHtmlCode);
  const [cssCode, setCssCode] = useState(initialCssCode);
  const [isPreviewMode, setIsPreviewMode] = useState(true);
  const [activeTab, setActiveTab] = useState('html'); // 'html' or 'css'
  const [copied, setCopied] = useState(false);
  const [previewTheme, setPreviewTheme] = useState('dark'); // Default to dark theme

  useEffect(() => {
    setHtmlCode(initialHtmlCode);
  }, [initialHtmlCode]);

  useEffect(() => {
    setCssCode(initialCssCode);
  }, [initialCssCode]);

  const handleHtmlCodeChange = (newCode) => {
    setHtmlCode(newCode);
    onHtmlCodeChange?.(newCode);
  };

  const handleCssCodeChange = (newCode) => {
    setCssCode(newCode);
    onCssCodeChange?.(newCode);
  };

  const copyToClipboard = async () => {
    try {
      const codeToCopy = activeTab === 'html' ? htmlCode : cssCode;
      await navigator.clipboard.writeText(codeToCopy);
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
    editorText: 'text-white',
    tabBg: 'bg-gray-700',
    tabActive: 'bg-blue-600'
  } : {
    bg: 'bg-white',
    headerBg: 'bg-gray-100',
    border: 'border-gray-300',
    text: 'text-gray-900',
    buttonBg: 'bg-gray-200 hover:bg-gray-300',
    editorBg: 'bg-white',
    editorText: 'text-gray-900',
    tabBg: 'bg-gray-200',
    tabActive: 'bg-blue-600'
  };

  return (
    <div className={`${themeColors.bg} rounded-lg overflow-hidden border ${themeColors.border}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-4 ${themeColors.headerBg} border-b ${themeColors.border}`}>
        <div className="flex items-center gap-2">
          <span className={`${themeColors.text} text-lg font-semibold`}>
            Code Editor
          </span>
          <span className={`${themeColors.text} text-sm opacity-70`}>
            (HTML + CSS)
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
            title={`Copy ${activeTab.toUpperCase()} Code`}
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
        {/* Code Editor Section */}
        <div className={`${showPreview && isPreviewMode ? 'w-1/2' : 'w-full'} transition-all duration-300`}>
          {/* Tabs for HTML/CSS */}
          <div className={`flex border-b ${themeColors.border} ${themeColors.headerBg}`}>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'html'
                  ? `${themeColors.tabActive} text-white`
                  : `${themeColors.text} hover:${themeColors.tabBg}`
              }`}
            >
              📄 HTML
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === 'css'
                  ? `${themeColors.tabActive} text-white`
                  : `${themeColors.text} hover:${themeColors.tabBg}`
              }`}
            >
              🎨 CSS
            </button>
          </div>

          {/* Code Editor */}
          <div className="relative h-full">
            {activeTab === 'html' ? (
              <textarea
                value={htmlCode}
                onChange={(e) => handleHtmlCodeChange(e.target.value)}
                readOnly={readOnly}
                className={`w-full h-full ${themeColors.editorBg} ${themeColors.editorText} p-4 font-mono text-sm resize-none focus:outline-none border-none ${readOnly ? 'cursor-default' : ''}`}
                placeholder="Enter your HTML code here..."
                spellCheck="false"
              />
            ) : (
              <textarea
                value={cssCode}
                onChange={(e) => handleCssCodeChange(e.target.value)}
                readOnly={readOnly}
                className={`w-full h-full ${themeColors.editorBg} ${themeColors.editorText} p-4 font-mono text-sm resize-none focus:outline-none border-none ${readOnly ? 'cursor-default' : ''}`}
                placeholder="Enter your CSS code here..."
                spellCheck="false"
              />
            )}
          </div>
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
                        ${cssCode}
                      </style>
                    </head>
                    <body>
                      <div class="preview-wrapper">
                        ${htmlCode}
                      </div>
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
            <span>💡 Tip: Switch between HTML & CSS tabs to edit both files</span>
          </div>
          <div className="flex items-center gap-2">
            <span>HTML Lines: {htmlCode.split('\n').length}</span>
            <span>•</span>
            <span>CSS Lines: {cssCode.split('\n').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DualCodeEditor;

'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import CodeEditor from './CodeEditor';
import DualCodeEditor from './DualCodeEditor';

const CodeViewerModal = ({ isOpen, onClose, component }) => {
  if (!isOpen || !component) return null;

  const componentCode = component.code || '';
  const componentTitle = component.title || 'Component';
  
  // Check if this is code object (new format) or JSON string (old format)
  let isObjectCode = false;
  let htmlCode = '';
  let cssCode = '';
  
  if (typeof componentCode === 'object' && componentCode !== null) {
    // New format: code is already an object
    isObjectCode = true;
    htmlCode = componentCode.html || '';
    cssCode = componentCode.css || '';
  } else {
    // Old format: try to parse as JSON
    try {
      const parsedCode = JSON.parse(componentCode);
      if (parsedCode.html && parsedCode.css) {
        isObjectCode = true;
        htmlCode = parsedCode.html;
        cssCode = parsedCode.css;
      }
    } catch (e) {
      // Not JSON, use as single code
      isObjectCode = false;
    }
  }

  const isCSSComponent = component.technology === 'css' || component.language?.toLowerCase().includes('css');

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div>
              <h2 className="text-2xl font-bold text-white">{componentTitle}</h2>
              <p className="text-gray-400 text-sm mt-1">
                {component.category} • {component.language}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Code Editor */}
          <div className="p-6">
            {isCSSComponent && isObjectCode ? (
              // Show dual editor for CSS components
              <DualCodeEditor
                initialHtmlCode={htmlCode}
                initialCssCode={cssCode}
                language="css"
                showPreview={true}
                height="600px"
                onHtmlCodeChange={() => {}} // Read-only mode
                onCssCodeChange={() => {}} // Read-only mode
                readOnly={true}
              />
            ) : (
              // Show single editor for other components
              <CodeEditor
                initialCode={typeof componentCode === 'object' ? JSON.stringify(componentCode, null, 2) : componentCode}
                language={component.language?.toLowerCase().includes('html') ? 'html' : 
                         component.language?.toLowerCase().includes('css') ? 'css' : 'html'}
                showPreview={true}
                height="600px"
                onCodeChange={() => {}} // Read-only mode
                readOnly={true}
              />
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
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
                        className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                    {component.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/20 text-gray-300 text-xs rounded">
                        +{component.tags.length - 3}
                      </span>
                    )}
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

export default CodeViewerModal;


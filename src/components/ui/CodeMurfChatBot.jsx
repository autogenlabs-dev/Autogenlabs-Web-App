'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import LazySpline from './LazySpline';

const CodeMurfChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample bot responses for Codemurf
  const botResponses = [
    "I can help you learn more about Codemurf and our infrastructure platform!",
    "Codemurf simplifies deployment and scaling with intelligent automation. Would you like to know more about our features?",
    "Our platform supports any framework and provides seamless CI/CD integration. What specific area interests you?",
    "We offer real-time monitoring, auto-scaling, and smart deployment strategies. How can I assist you today?",
    "Codemurf is designed for developers who want powerful infrastructure without complexity. What would you like to explore?",
    "You can deploy applications instantly with zero configuration. Would you like to see a demo?",
    "Our intelligent platform handles everything from databases to networking. What questions do you have?"
  ];

  // Initialize with greeting message
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setMessages([{
          id: 1,
          text: "Hi! How can I help you with Codemurf?",
          isBot: true,
          timestamp: new Date()
        }]);
      }, 500);
    }
  }, [isOpen, messages.length]);

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response with typing delay
    setTimeout(() => {
      setIsTyping(false);
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      const botMessage = {
        id: Date.now() + 1,
        text: randomResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Fallback for floating button (simple gradient circle)
  const ButtonFallback = () => (
    <div className="w-20 h-20 md:w-52 md:h-52 rounded-full bg-gradient-to-br from-purple-600 via-cyan-500 to-pink-500 flex items-center justify-center shadow-2xl">
      <div className="w-12 h-12 md:w-24 md:h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
        <span className="text-2xl md:text-4xl">🤖</span>
      </div>
    </div>
  );

  // Fallback for chat header avatar (simple gradient circle)
  const AvatarFallback = () => (
    <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
      <span className="text-lg">🤖</span>
    </div>
  );

  return (
    <>
      {/* Hide Spline watermarks */}
      <style jsx global>{`
        iframe[src*="spline.design"] {
          overflow: hidden !important;
        }
        .spline-watermark,
        [data-spline-watermark],
        div[style*="position: absolute"][style*="bottom"],
        div[style*="pointer-events: none"][style*="bottom"] {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
        }
      `}</style>

      {/* Floating Chatbot Button */}
      <motion.div
        className="fixed bottom-6 -right-2 z-50 cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, duration: 0.5, type: "spring" }}
      >
        <motion.button
          onClick={() => setIsOpen(true)}
          className="relative w-20 h-20 md:w-52 md:h-52  overflow-hidden shadow-2xl  transition-all duration-300 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Lazy-loaded Spline 3D Robot with fallback */}
          <LazySpline
            src="https://my.spline.design/genkubgreetingrobot-NkmnY3putuQvSKSkMPAUSr16/"
            fallback={<ButtonFallback />}
            delay={5000} // Load after 5 seconds (non-critical)
            className="w-full h-full"
            width="100%"
            height="100%"
            style={{
  position:'absolute',
  top:"26px"
}}
            title="Codemurf Chatbot"
            intersectionDelay={1000}
          />
        </motion.button>

                  
      </motion.div>

      {/* Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-end p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Chat Window */}
            <motion.div
              className="relative w-full max-w-md h-[600px] rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(10,9,14,0.95) 0%, rgba(7,6,11,0.95) 100%)',
                backdropFilter: 'blur(20px)',
              }}
              initial={{ scale: 0.8, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 100 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-600 p-0.5">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                      {/* Lazy-loaded Spline avatar with fallback */}
                      <LazySpline
                        src="https://my.spline.design/genkubgreetingrobot-NkmnY3putuQvSKSkMPAUSr16/"
                        fallback={<AvatarFallback />}
                        delay={8000} // Load much later (least critical)
                        className="w-full h-full scale-75"
                        title="Codemurf Assistant"
                        intersectionDelay={2000}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Codemurf Assistant</h3>
                    <div className="text-green-400 text-xs flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      Online
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[450px]">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.isBot
                          ? 'bg-white/10 text-white border border-white/20'
                          : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className="bg-white/10 border border-white/20 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10">
                <div className="flex space-x-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="w-12 h-12 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center transition-all"
                  >
                    <Send size={18} className="text-white" />
                  </button>
                </div>
              </div>

              {/* Glassmorphism Shine Effect */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg,
                    rgba(255,255,255,0.1) 0%,
                    rgba(255,255,255,0.05) 25%,
                    transparent 50%,
                    rgba(255,255,255,0.05) 75%,
                    rgba(255,255,255,0.1) 100%)`
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CodeMurfChatbot;

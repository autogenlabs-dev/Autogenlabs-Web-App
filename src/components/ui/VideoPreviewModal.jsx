'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

const VideoPreviewModal = ({ isOpen, onClose, template }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const [videoRef, setVideoRef] = useState(null);

    // Auto-hide controls after 3 seconds
    useEffect(() => {
        if (!showControls) return;

        const timer = setTimeout(() => {
            setShowControls(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [showControls, isPlaying]);

    // Handle play/pause
    const togglePlay = () => {
        if (videoRef) {
            if (isPlaying) {
                videoRef.pause();
            } else {
                videoRef.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Handle mute/unmute
    const toggleMute = () => {
        if (videoRef) {
            videoRef.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !template) return null;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

                {/* Modal Content */}
                <motion.div
                    className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    onClick={(e) => e.stopPropagation()}
                    onMouseMove={() => setShowControls(true)}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {/* Template Info */}
                    <div className="absolute top-4 left-4 z-30 bg-black/50 backdrop-blur-sm rounded-lg px-4 py-2">
                        <h3 className="text-white font-semibold">{template.title}</h3>
                        <p className="text-gray-300 text-sm">{template.category}</p>
                    </div>

                    {/* Video */}
                    {template.videoPreview ? (
                        <video
                            ref={setVideoRef}
                            className="w-full h-full object-cover"
                            src={template.videoPreview}
                            poster={template.previewImage}
                            muted={isMuted}
                            loop
                            playsInline
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onLoadedMetadata={() => {
                                // Auto-play when loaded
                                if (videoRef) {
                                    videoRef.play();
                                }
                            }}
                        />
                    ) : (
                        // Fallback to image if no video
                        <div
                            className="w-full h-full bg-cover bg-center relative"
                            style={{ backgroundImage: `url(${template.previewImage})` }}
                        >
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                <div className="text-center text-white">
                                    <Play size={48} className="mx-auto mb-4 opacity-60" />
                                    <p className="text-lg">Video preview not available</p>
                                    <p className="text-sm text-gray-300">Showing static preview</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Video Controls */}
                    <AnimatePresence>
                        {showControls && template.videoPreview && (
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex items-center justify-between">
                                    {/* Play/Pause Button */}
                                    <button
                                        onClick={togglePlay}
                                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                    >
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                                    </button>

                                    {/* Right Controls */}
                                    <div className="flex items-center gap-4">
                                        {/* Mute/Unmute */}
                                        <button
                                            onClick={toggleMute}
                                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                                        >
                                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                                        </button>

                                        {/* Template Actions */}
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`/templates/${template.id}`}
                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
                                                onClick={onClose}
                                            >
                                                View Details
                                            </a>
                                            {template.liveDemoUrl && (
                                                <a
                                                    href={template.liveDemoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg text-white font-medium transition-colors"
                                                >
                                                    Live Demo
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Center Play Button (when paused) */}
                    {!isPlaying && template.videoPreview && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <button
                                onClick={togglePlay}
                                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all hover:scale-110"
                            >
                                <Play size={32} className="ml-1" />
                            </button>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default VideoPreviewModal;


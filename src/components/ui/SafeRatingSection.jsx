'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle } from 'lucide-react';

const SafeRatingSection = ({ template, user = null }) => {
    // Ultimate safety check
    if (!template) {
        console.log('SafeRatingSection: No template provided');
        return (
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="text-gray-400">Rating information not available</div>
            </div>
        );
    }

    // Parse and validate rating with extensive safety
    let safeRating = 0;
    let safeTotalRatings = 0;

    try {
        if (template.rating !== undefined && template.rating !== null) {
            const parsedRating = Number(template.rating);
            if (!isNaN(parsedRating) && parsedRating >= 0 && parsedRating <= 5) {
                safeRating = parsedRating;
            }
        }

        if (template.totalRatings !== undefined && template.totalRatings !== null) {
            const parsedTotal = Number(template.totalRatings);
            if (!isNaN(parsedTotal) && parsedTotal >= 0) {
                safeTotalRatings = parsedTotal;
            }
        } else if (template.downloads !== undefined && template.downloads !== null) {
            const parsedDownloads = Number(template.downloads);
            if (!isNaN(parsedDownloads) && parsedDownloads >= 0) {
                safeTotalRatings = parsedDownloads;
            }
        }
    } catch (error) {
        console.warn('SafeRatingSection: Error parsing rating data:', error);
    }

    const renderStars = (rating) => {
        const stars = [];
        const safeRatingValue = Number(rating) || 0;

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <Star
                    key={i}
                    className={`w-6 h-6 ${
                        i <= safeRatingValue
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-400'
                    }`}
                />
            );
        }
        return stars;
    };

    return (
        <div className="space-y-8">
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    
                    {/* Average Rating */}
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                            <div className="text-6xl font-bold text-white">
                                {safeRating.toFixed(1)}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    {renderStars(safeRating)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default SafeRatingSection;

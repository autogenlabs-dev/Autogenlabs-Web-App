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
                                <p className="text-gray-400">
                                    Based on {safeTotalRatings} reviews
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rating Breakdown */}
                    <div className="space-y-3">
                        {[5, 4, 3, 2, 1].map(rating => (
                            <div key={rating} className="flex items-center gap-3">
                                <div className="flex items-center gap-1 w-16">
                                    <span className="text-sm text-gray-300">{rating}</span>
                                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                </div>
                                <div className="flex-1 bg-gray-700 rounded-full h-2">
                                    <div
                                        className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full"
                                        style={{ width: `${Math.random() * 80 + 10}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-400 w-12">
                                    {Math.floor(Math.random() * 50 + 10)}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="flex items-center gap-2 mb-6">
                    <MessageCircle className="w-6 h-6 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Reviews</h3>
                </div>

                <div className="space-y-6">
                    {/* Mock Reviews */}
                    {[
                        {
                            name: 'Alice Johnson',
                            rating: 5,
                            comment: 'Excellent component! Very well structured and easy to customize.',
                            date: '2024-01-15'
                        },
                        {
                            name: 'Bob Smith', 
                            rating: 4,
                            comment: 'Good quality component. Clean code and well documented.',
                            date: '2024-01-12'
                        }
                    ].map((review, index) => (
                        <motion.div
                            key={index}
                            className="border-b border-white/10 pb-6 last:border-b-0"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                                    {review.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-white">{review.name}</h4>
                                        <div className="flex items-center gap-1">
                                            {renderStars(review.rating)}
                                        </div>
                                        <span className="text-sm text-gray-400">{review.date}</span>
                                    </div>
                                    <p className="text-gray-300">{review.comment}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SafeRatingSection;

'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, User, ThumbsUp, MessageCircle } from 'lucide-react';

const RatingSection = ({ template, user = null }) => {
    const [userRating, setUserRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Add comprehensive error protection
    if (!template || typeof template !== 'object') {
        return (
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="text-gray-400">Rating information not available</div>
            </div>
        );
    }

    // Provide default values with type checking
    const safeTemplate = {
        rating: typeof template.rating === 'number' ? template.rating : 0,
        totalRatings: typeof template.totalRatings === 'number' ? template.totalRatings : 0,
        title: template.title || 'Unknown Component',
        ...template
    };

    // No mock reviews - using real data from CommentSystem

    const renderStars = (rating, interactive = false, onStarClick = null, size = 'w-5 h-5') => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    onClick={() => interactive && onStarClick && onStarClick(i)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!interactive}
                >
                    <Star
                        className={`${size} ${i <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                    />
                </button>
            );
        }

        return stars;
    };

    const handleRatingSubmit = async () => {
        if (!userRating) return;

        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log('Submitting rating:', {
                templateId: template.id,
                rating: userRating,
                review: reviewText,
                userId: user?.id
            });

            alert('Thank you for your rating!');
            setShowReviewForm(false);
            setUserRating(0);
            setReviewText('');

        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Error submitting rating. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Calculate rating distribution
    const ratingDistribution = {
        5: 45,
        4: 25,
        3: 15,
        2: 10,
        1: 5
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="space-y-8">

            {/* Rating Overview */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Average Rating */}
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                            <div className="text-6xl font-bold text-white">
                                {safeTemplate.rating ? safeTemplate.rating.toFixed(1) : '0.0'}
                            </div>
                            <div>
                                <div className="flex items-center gap-1 mb-2">
                                    {renderStars(safeTemplate.rating || 0, false, null, 'w-6 h-6')}
                                </div>
                                <p className="text-gray-400">
                                    Based on {safeTemplate.totalRatings || 0} reviews
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
                                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${ratingDistribution[rating]}%` }}
                                    />
                                </div>
                                <span className="text-sm text-gray-400 w-10">
                                    {ratingDistribution[rating]}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Write Review */}
            {user?.isLoggedIn && (
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    {!showReviewForm ? (
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-white mb-4">
                                Share Your Experience
                            </h3>
                            <p className="text-gray-400 mb-6">
                                Help others by sharing your thoughts about this template
                            </p>
                            <button
                                onClick={() => setShowReviewForm(true)}
                                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105"
                            >
                                Write a Review
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <h3 className="text-xl font-semibold text-white">Write Your Review</h3>

                            {/* Rating Selection */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Your Rating
                                </label>
                                <div className="flex items-center gap-2">
                                    {renderStars(userRating, true, setUserRating, 'w-8 h-8')}
                                    {userRating > 0 && (
                                        <span className="ml-3 text-lg font-semibold text-yellow-400">
                                            {userRating} star{userRating !== 1 ? 's' : ''}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Review Text */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Your Review (Optional)
                                </label>
                                <textarea
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                    placeholder="Share your experience with this template..."
                                    rows="4"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-vertical"
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowReviewForm(false)}
                                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRatingSubmit}
                                    disabled={!userRating || isSubmitting}
                                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${userRating && !isSubmitting
                                            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:scale-105'
                                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        'Submit Review'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Reviews List */}
            <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <MessageCircle className="w-7 h-7 text-purple-400" />
                    Customer Reviews
                </h3>

                <div className="space-y-6">
                    {mockReviews.map((review) => (
                        <motion.div
                            key={review.id}
                            className="bg-white/5 rounded-2xl p-6 border border-white/10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex items-start gap-4">

                                {/* Avatar */}
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center border border-white/20">
                                    <User className="w-6 h-6 text-gray-300" />
                                </div>

                                <div className="flex-1 space-y-3">

                                    {/* User Info & Rating */}
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                        <div>
                                            <h4 className="font-semibold text-white">{review.userName}</h4>
                                            <p className="text-sm text-gray-400">{formatDate(review.date)}</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {renderStars(review.rating)}
                                            <span className="text-sm text-gray-300 ml-2">
                                                {review.rating}/5
                                            </span>
                                        </div>
                                    </div>

                                    {/* Review Text */}
                                    <p className="text-gray-300 leading-relaxed">
                                        {review.comment}
                                    </p>

                                    {/* Helpful */}
                                    <div className="flex items-center gap-4 pt-2">
                                        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-green-400 transition-colors">
                                            <ThumbsUp className="w-4 h-4" />
                                            Helpful ({review.helpful})
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Reviews */}
                <div className="text-center mt-8">
                    <button className="px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-gray-300 hover:bg-white/15 hover:text-white transition-all duration-300">
                        Load More Reviews
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RatingSection;

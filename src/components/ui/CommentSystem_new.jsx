import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, ThumbsUp, ThumbsDown, MoreVertical, Edit, Trash2, Reply, Flag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { marketplaceApi } from '../../lib/marketplaceApi';

const CommentSystem = ({ itemId, itemType, itemTitle }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [replyingTo, setReplyingTo] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [showAllComments, setShowAllComments] = useState(false);
    
    const { user, isAuthenticated } = useAuth();

    useEffect(() => {
        loadComments();
    }, [itemId, itemType]);

    const loadComments = async () => {
        try {
            setLoading(true);
            let response;
            
            if (itemType === 'template') {
                response = await marketplaceApi.getTemplateComments(itemId);
            } else if (itemType === 'component') {
                response = await marketplaceApi.getComponentComments(itemId);
            } else {
                throw new Error('Invalid item type');
            }
            
            setComments(response.comments || []);
        } catch (err) {
            console.error('Failed to load comments:', err);
            setError('Failed to load comments');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        
        if (!isAuthenticated) {
            setError('Please login to leave a comment');
            return;
        }

        if (!newComment.trim()) {
            setError('Comment cannot be empty');
            return;
        }

        try {
            setSubmitting(true);
            setError('');

            const commentData = {
                content: newComment.trim(),
                rating: replyingTo ? null : (newRating > 0 ? newRating : null),
                parent_comment_id: replyingTo?.id || null
            };

            console.log('Submitting comment:', {
                itemType,
                itemId,
                commentData,
                isAuthenticated,
                user: user?.id
            });

            let response;
            if (itemType === 'template') {
                console.log('Creating template comment...');
                response = await marketplaceApi.createTemplateComment(itemId, commentData);
            } else if (itemType === 'component') {
                console.log('Creating component comment...');
                response = await marketplaceApi.createComponentComment(itemId, commentData);
            } else {
                throw new Error('Invalid item type');
            }

            console.log('Comment created successfully:', response);
            setNewComment('');
            setNewRating(0);
            setReplyingTo(null);
            await loadComments();
        } catch (err) {
            console.error('Failed to submit comment:', err);
            console.error('Error details:', err.message, err.status);
            setError('Failed to submit comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditComment = async (commentId, newContent) => {
        try {
            const updateData = { content: newContent };
            
            if (itemType === 'template') {
                await marketplaceApi.updateTemplateComment(commentId, updateData);
            } else if (itemType === 'component') {
                await marketplaceApi.updateComponentComment(commentId, updateData);
            } else {
                throw new Error('Invalid item type');
            }
            
            setEditingComment(null);
            await loadComments();
        } catch (err) {
            console.error('Failed to edit comment:', err);
            setError('Failed to edit comment');
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            if (itemType === 'template') {
                await marketplaceApi.deleteTemplateComment(commentId);
            } else if (itemType === 'component') {
                await marketplaceApi.deleteComponentComment(commentId);
            } else {
                throw new Error('Invalid item type');
            }
            
            await loadComments();
        } catch (err) {
            console.error('Failed to delete comment:', err);
            setError('Failed to delete comment');
        }
    };

    const handleVoteComment = async (commentId, voteType) => {
        if (!isAuthenticated) {
            setError('Please login to vote on comments');
            return;
        }

        try {
            await marketplaceApi.voteComment(commentId, voteType);
            await loadComments();
        } catch (err) {
            console.error('Failed to vote on comment:', err);
        }
    };

    const renderStars = (rating, interactive = false, onStarClick = null) => {
        const stars = [];
        const displayRating = interactive ? (hoverRating || newRating) : rating;

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    type="button"
                    onClick={() => interactive && onStarClick && onStarClick(i)}
                    onMouseEnter={() => interactive && setHoverRating(i)}
                    onMouseLeave={() => interactive && setHoverRating(0)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!interactive}
                >
                    <Star
                        className={`w-5 h-5 ${
                            i <= displayRating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                        }`}
                    />
                </button>
            );
        }

        return stars;
    };

    const displayedComments = showAllComments ? comments : comments.slice(0, 3);

    if (loading) {
        return (
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-white/10 rounded w-1/4"></div>
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-20 bg-white/5 rounded"></div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-6 h-6 text-blue-400" />
                <h3 className="text-xl font-semibold text-white">
                    Reviews & Comments ({comments.length})
                </h3>
            </div>

            {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 mb-4 text-red-400 text-sm">
                    {error}
                </div>
            )}

            {/* Add Comment Form */}
            {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-8 space-y-4">
                    {replyingTo && (
                        <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                            <div className="flex items-center justify-between">
                                <span className="text-blue-400 text-sm">
                                    Replying to {replyingTo.user_name}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setReplyingTo(null)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Rating Selection */}
                    {!replyingTo && (
                        <div className="mb-4">
                            <label className="block text-white text-sm font-medium mb-2">
                                Rate this {itemType}:
                            </label>
                            <div className="flex items-center space-x-1">
                                {renderStars(newRating, true, setNewRating)}
                                {newRating > 0 && (
                                    <span className="ml-2 text-sm text-gray-400">
                                        {newRating} star{newRating !== 1 ? 's' : ''}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={`Share your thoughts about this ${itemType}...`}
                            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows="4"
                            disabled={submitting}
                        />
                        <button
                            type="submit"
                            disabled={submitting || !newComment.trim()}
                            className="absolute bottom-3 right-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                </form>
            ) : (
                <div className="bg-white/5 rounded-lg p-4 mb-8 text-center">
                    <p className="text-gray-400">Please login to leave a comment</p>
                </div>
            )}

            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="space-y-6">
                    {displayedComments.map((comment) => (
                        <div key={comment.id} className="border-b border-white/10 pb-6 last:border-b-0">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                    {comment.user_name?.charAt(0) || 'U'}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h4 className="font-semibold text-white">{comment.user_name}</h4>
                                        {comment.rating && (
                                            <div className="flex items-center gap-1">
                                                {renderStars(comment.rating)}
                                            </div>
                                        )}
                                        <span className="text-sm text-gray-400">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 mb-3">{comment.content}</p>
                                    
                                    {/* Comment Actions */}
                                    <div className="flex items-center gap-4 text-sm">
                                        <button
                                            onClick={() => handleVoteComment(comment.id, 'helpful')}
                                            className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors"
                                        >
                                            <ThumbsUp className="w-4 h-4" />
                                            <span>{comment.helpful_votes || 0}</span>
                                        </button>
                                        
                                        <button
                                            onClick={() => setReplyingTo(comment)}
                                            className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                                        >
                                            <Reply className="w-4 h-4" />
                                            Reply
                                        </button>
                                        
                                        {user?.id === comment.user_id && (
                                            <>
                                                <button
                                                    onClick={() => setEditingComment(comment)}
                                                    className="flex items-center gap-1 text-gray-400 hover:text-yellow-400 transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment.id)}
                                                    className="flex items-center gap-1 text-gray-400 hover:text-red-400 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {comments.length > 3 && (
                        <button
                            onClick={() => setShowAllComments(!showAllComments)}
                            className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium py-2 transition-colors"
                        >
                            {showAllComments ? 'Show Less' : `Show All ${comments.length} Comments`}
                        </button>
                    )}
                </div>
            ) : (
                <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-300 mb-2">No reviews yet</h4>
                    <p className="text-gray-400">
                        Be the first to review this {itemType}!
                    </p>
                </div>
            )}
        </div>
    );
};

export default CommentSystem;


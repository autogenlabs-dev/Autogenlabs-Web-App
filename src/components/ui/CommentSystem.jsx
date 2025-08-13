/**
 * Comment System Component
 * Handles comments and ratings for templates and components
 */

'use client';
import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Send, ThumbsUp, ThumbsDown, MoreVertical, Edit, Trash2, Reply, Flag } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { marketplaceApi } from '@/lib/marketplaceApi';

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
            const response = await marketplaceApi.getComments(itemId, itemType);
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

            await marketplaceApi.addComment(itemId, itemType, {
                content: newComment.trim(),
                rating: newRating,
                parent_id: replyingTo?.id || null
            });

            setNewComment('');
            setNewRating(0);
            setReplyingTo(null);
            await loadComments();
        } catch (err) {
            console.error('Failed to submit comment:', err);
            setError('Failed to submit comment. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleEditComment = async (commentId, newContent) => {
        try {
            await marketplaceApi.updateComment(commentId, { content: newContent });
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
            await marketplaceApi.deleteComment(commentId);
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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const averageRating = comments.length > 0 
        ? comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) / comments.filter(c => c.rating > 0).length 
        : 0;

    const displayedComments = showAllComments ? comments : comments.slice(0, 5);

    const CommentItem = ({ comment, isReply = false }) => {
        const [showActions, setShowActions] = useState(false);
        const [editContent, setEditContent] = useState(comment.content);

        return (
            <div className={`${isReply ? 'ml-12 mt-3' : 'mt-4'} bg-white/5 rounded-lg p-4 border border-white/10`}>
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                        {/* User Avatar */}
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                                {comment.user_name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                                <h4 className="text-white font-medium">{comment.user_name || 'Anonymous'}</h4>
                                {comment.rating > 0 && (
                                    <div className="flex items-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-4 h-4 ${
                                                    star <= comment.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                )}
                                <span className="text-gray-400 text-sm">{formatDate(comment.created_at)}</span>
                            </div>

                            {editingComment === comment.id ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-blue-500"
                                        rows="3"
                                    />
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditComment(comment.id, editContent)}
                                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingComment(null)}
                                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-300 mb-3">{comment.content}</p>
                            )}

                            {/* Comment Actions */}
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                                <button
                                    onClick={() => handleVoteComment(comment.id, 'upvote')}
                                    className="flex items-center space-x-1 hover:text-green-400 transition-colors"
                                >
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{comment.upvotes || 0}</span>
                                </button>
                                <button
                                    onClick={() => handleVoteComment(comment.id, 'downvote')}
                                    className="flex items-center space-x-1 hover:text-red-400 transition-colors"
                                >
                                    <ThumbsDown className="w-4 h-4" />
                                    <span>{comment.downvotes || 0}</span>
                                </button>
                                {!isReply && (
                                    <button
                                        onClick={() => setReplyingTo(comment)}
                                        className="flex items-center space-x-1 hover:text-blue-400 transition-colors"
                                    >
                                        <Reply className="w-4 h-4" />
                                        <span>Reply</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Comment Menu */}
                    {(user?.id === comment.user_id || user?.role === 'admin') && (
                        <div className="relative">
                            <button
                                onClick={() => setShowActions(!showActions)}
                                className="p-1 text-gray-400 hover:text-white transition-colors"
                            >
                                <MoreVertical className="w-4 h-4" />
                            </button>
                            {showActions && (
                                <div className="absolute right-0 top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-10 min-w-32">
                                    <button
                                        onClick={() => {
                                            setEditingComment(comment.id);
                                            setShowActions(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-700 flex items-center space-x-2"
                                    >
                                        <Edit className="w-4 h-4" />
                                        <span>Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleDeleteComment(comment.id);
                                            setShowActions(false);
                                        }}
                                        className="w-full px-4 py-2 text-left text-red-400 hover:bg-gray-700 flex items-center space-x-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Replies */}
                {comment.replies && comment.replies.length > 0 && (
                    <div className="mt-4">
                        {comment.replies.map((reply) => (
                            <CommentItem key={reply.id} comment={reply} isReply={true} />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6">
            {/* Comments Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <h3 className="text-xl font-semibold text-white flex items-center">
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Reviews & Comments ({comments.length})
                    </h3>
                    {averageRating > 0 && (
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        className={`w-4 h-4 ${
                                            star <= Math.round(averageRating)
                                                ? 'text-yellow-400 fill-current'
                                                : 'text-gray-400'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-300">
                                {averageRating.toFixed(1)} avg
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Add Comment Form */}
            {isAuthenticated ? (
                <form onSubmit={handleSubmitComment} className="mb-6">
                    {replyingTo && (
                        <div className="mb-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
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
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setNewRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                        className="focus:outline-none"
                                    >
                                        <Star
                                            className={`w-6 h-6 transition-colors ${
                                                star <= (hoverRating || newRating)
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-400'
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comment Input */}
                    <div className="relative">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder={`Share your thoughts about this ${itemType}...`}
                            className="w-full bg-white/10 border border-white/20 rounded-xl p-4 pr-12 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            rows="4"
                        />
                        <button
                            type="submit"
                            disabled={submitting || !newComment.trim()}
                            className="absolute bottom-3 right-3 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                        >
                            {submitting ? (
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </div>

                    {error && (
                        <p className="mt-2 text-red-400 text-sm">{error}</p>
                    )}
                </form>
            ) : (
                <div className="mb-6 p-4 bg-gray-800/50 border border-gray-600 rounded-lg text-center">
                    <p className="text-gray-300">
                        <a href="/auth" className="text-blue-400 hover:text-blue-300">Login</a> to leave a review
                    </p>
                </div>
            )}

            {/* Comments List */}
            {loading ? (
                <div className="text-center py-8">
                    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading comments...</p>
                </div>
            ) : comments.length > 0 ? (
                <div>
                    {displayedComments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))}

                    {comments.length > 5 && !showAllComments && (
                        <button
                            onClick={() => setShowAllComments(true)}
                            className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-medium"
                        >
                            Show all {comments.length} comments
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

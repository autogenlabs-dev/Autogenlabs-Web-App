/**
 * Developer Dashboard Page
 * For content creators to manage their templates, components, earnings, and analytics
 */

'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
    DollarSign, 
    TrendingUp, 
    Package, 
    Star,
    Plus,
    Edit,
    Trash2,
    Eye,
    Download,
    Calendar,
    BarChart3,
    Settings,
    Upload,
    MessageSquare,
    Award,
    Clock
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { useAuth as useClerkAuth } from '@clerk/nextjs';
import { developerApi } from '../../../lib/developerApi';
import { marketplaceApi } from '../../../lib/marketplaceApi';
import ProtectedRoute from '../../shared/ProtectedRoute';
import AnalyticsDashboard from '../../analytics/AnalyticsDashboard';

const DeveloperDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [myContent, setMyContent] = useState([]);
    const [earnings, setEarnings] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [contentFilter, setContentFilter] = useState('all');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'content', label: 'My Content', icon: Package },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'upload', label: 'Upload New', icon: Upload }
    ];

    useEffect(() => {
        loadDeveloperData();
    }, []);

    const loadDeveloperData = async () => {
        try {
            setLoading(true);
            
            // Load actual user dashboard data
            const { paymentApi } = await import('../../../lib/paymentApi');
            const { templateApi } = await import('../../../lib/apiTemplates');
            const { componentApi } = await import('../../../lib/componentApi');
            
            // Get user dashboard data
            let dashboardResponse = null;
            try {
                dashboardResponse = await paymentApi.getUserDashboard();
                setDashboardData(dashboardResponse);
            } catch (error) {
                console.warn('Dashboard API error:', error);
                setDashboardData({
                    dashboard_stats: {
                        templates_created: 0,
                        components_created: 0,
                        total_downloads: 0,
                        total_earnings: 0
                    }
                });
            }

            // Load user's templates and components
            let templatesData = [];
            let componentsData = [];

            try {
                // Get user's templates via marketplaceApi with Clerk token
                try {
                    const { getToken } = useClerkAuth();
                    const token = await getToken();
                    const tplResp = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')}/api/templates/user/my-templates`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    if (tplResp.ok) {
                        const templatesResult = await tplResp.json();
                        templatesData = templatesResult.templates || [];
                    }
                } catch (tokenErr) {
                    console.warn('No Clerk token available for templates:', tokenErr);
                }
            } catch (error) {
                console.warn('Failed to load templates:', error);
            }

            try {
                // Get user's components via marketplaceApi with Clerk token
                try {
                    const { getToken } = useClerkAuth();
                    const token = await getToken();
                    const compResp = await fetch(`${(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000').replace(/\/$/, '')}/api/components/user/my-components?skip=0&limit=100`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    console.log('🔍 Components response status:', compResp.status);

                    if (compResp.ok) {
                        const componentsResult = await compResp.json();
                        console.log('🔍 Components API response:', componentsResult);
                        componentsData = componentsResult.components || [];
                        console.log('🔍 Components data extracted:', componentsData);
                    } else {
                        const errorText = await compResp.text();
                        console.error('❌ Components API error:', errorText);
                    }
                } catch (tokenErr) {
                    console.warn('No Clerk token available for components:', tokenErr);
                }
            } catch (error) {
                console.error('❌ Failed to load components:', error);
            }

            // Combine and set content data
            const combinedContent = [
                ...templatesData.map(t => ({ ...t, type: 'template' })),
                ...componentsData.map(c => ({ ...c, type: 'component' }))
            ];
            
            console.log('🔍 Templates data:', templatesData.length, templatesData);
            console.log('🔍 Components data:', componentsData.length, componentsData);
            console.log('🔍 Combined content:', combinedContent.length, combinedContent);
            
            setMyContent(combinedContent);

            // Set earnings data based on dashboard stats
            const stats = dashboardResponse?.dashboard_stats || {};
            setEarnings({
                total_earnings_inr: stats.total_earnings || 0,
                available_balance_inr: 0,
                pending_balance_inr: 0,
                total_sales_count: stats.total_downloads || 0,
                monthly_earnings: {},
                monthly_sales: {}
            });

            // Set analytics based on user content
            setAnalytics({
                total_views: combinedContent.reduce((sum, item) => sum + (item.views || 0), 0),
                total_downloads: combinedContent.reduce((sum, item) => sum + (item.downloads || 0), 0),
                total_likes: combinedContent.reduce((sum, item) => sum + (item.likes || 0), 0),
                conversion_rate: combinedContent.length > 0 ? 
                    (combinedContent.reduce((sum, item) => sum + (item.downloads || 0), 0) / 
                     combinedContent.reduce((sum, item) => sum + (item.views || 0), 1)) * 100 : 0
            });

        } catch (error) {
            console.error('Failed to load developer data:', error);
            // Set fallback data so dashboard is still functional
            setDashboardData({
                dashboard_stats: {
                    templates_created: 0,
                    components_created: 0,
                    total_downloads: 0,
                    total_earnings: 0
                }
            });
            setEarnings({
                total_earnings_inr: 0,
                available_balance_inr: 0,
                pending_balance_inr: 0,
                total_sales_count: 0,
                monthly_earnings: {},
                monthly_sales: {}
            });
            setMyContent([]);
            setAnalytics({
                total_views: 0,
                total_downloads: 0,
                total_likes: 0,
                conversion_rate: 0
            });
        } finally {
            setLoading(false);
        }
    };

    const handleRequestPayout = async () => {
        try {
            await developerApi.requestPayout({
                amount: earnings?.available_for_payout || 0
            });
            
            // Reload earnings to update payout status
            const earningsResponse = await developerApi.getEarnings();
            setEarnings(earningsResponse);
            
            alert('Payout requested successfully!');
        } catch (error) {
            console.error('Failed to request payout:', error);
            alert('Failed to request payout. Please try again.');
        }
    };

    const filteredContent = myContent.filter(item => {
        if (contentFilter === 'all') return true;
        return item.type === contentFilter;
    });

    // Calculate real stats from actual data
    const calculateStats = () => {
        const stats = dashboardData?.dashboard_stats || {};
        const totalTemplates = myContent.filter(item => item.type === 'template').length;
        const totalComponents = myContent.filter(item => item.type === 'component').length;
        const totalViews = myContent.reduce((sum, item) => sum + (item.views || 0), 0);
        const totalDownloads = myContent.reduce((sum, item) => sum + (item.downloads || 0), 0);
        const totalLikes = myContent.reduce((sum, item) => sum + (item.likes || 0), 0);

        return [
            {
                title: 'Total Templates',
                value: totalTemplates,
                icon: Package,
                color: 'green',
                subtitle: 'Templates created'
            },
            {
                title: 'Total Components',
                value: totalComponents,
                icon: Package,
                color: 'blue',
                subtitle: 'Components created'
            },
            {
                title: 'Total Views',
                value: totalViews.toLocaleString(),
                icon: Eye,
                color: 'purple',
                subtitle: 'Content views'
            },
            {
                title: 'Total Downloads',
                value: totalDownloads.toLocaleString(),
                icon: Download,
                color: 'orange',
                subtitle: 'Downloads count'
            }
        ];
    };

    const stats = calculateStats();

    if (loading) {
        return (
            <ProtectedRoute requiredRole="developer">
                <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                            <p className="text-white mt-4">Loading your developer dashboard...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute requiredRole="developer">
            <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-green-600 to-blue-600 px-6 py-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30">
                                        <Award className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">
                                            Developer Dashboard
                                        </h1>
                                        <p className="text-green-100">
                                            Welcome back, {user?.firstName || user?.name || 'Developer'}! Manage your content and track earnings.
                                        </p>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setActiveTab('upload')}
                                    className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    Upload New Content
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className={`p-3 bg-${stat.color}-500/20 rounded-lg`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                                    <p className="text-gray-500 text-xs">{stat.subtitle}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Tabs */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl mb-8">
                        <div className="flex space-x-8 px-6 py-4">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center space-x-2 pb-2 font-medium transition-colors ${
                                        activeTab === tab.id
                                            ? 'text-green-400 border-b-2 border-green-400'
                                            : 'text-gray-300 hover:text-white'
                                    }`}
                                >
                                    <tab.icon className="w-4 h-4" />
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'overview' && (
                        <div className="space-y-8">
                            {/* Content Summary */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Content Summary</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                                <Package className="w-5 h-5 text-purple-400" />
                                            </div>
                                            <span className="text-2xl font-bold text-white">
                                                {myContent.filter(item => item.type === 'template').length}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-white">Templates</h3>
                                        <p className="text-sm text-gray-400">
                                            {myContent.filter(item => item.type === 'template' && (item.status === 'approved' || item.approval_status === 'approved')).length} approved
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-2 bg-blue-500/20 rounded-lg">
                                                <Package className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <span className="text-2xl font-bold text-white">
                                                {myContent.filter(item => item.type === 'component').length}
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-white">Components</h3>
                                        <p className="text-sm text-gray-400">
                                            {myContent.filter(item => item.type === 'component' && (item.status === 'approved' || item.approval_status === 'approved')).length} approved
                                        </p>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="p-2 bg-green-500/20 rounded-lg">
                                                <TrendingUp className="w-5 h-5 text-green-400" />
                                            </div>
                                            <span className="text-2xl font-bold text-white">
                                                {((myContent.reduce((sum, item) => sum + (item.downloads || 0), 0) / 
                                                   Math.max(myContent.reduce((sum, item) => sum + (item.views || 0), 1), 1)) * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                        <h3 className="font-medium text-white">Conversion Rate</h3>
                                        <p className="text-sm text-gray-400">Downloads vs Views</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Content */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-semibold text-white">Recent Content</h2>
                                    <Link 
                                        href="/dashboard?tab=content"
                                        className="text-green-400 hover:text-green-300 text-sm font-medium"
                                    >
                                        View All →
                                    </Link>
                                </div>
                                
                                {myContent.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {myContent
                                            .sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0))
                                            .slice(0, 6)
                                            .map((item, index) => (
                                                <div key={item.id || index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <h3 className="font-medium text-white text-sm truncate mr-2">{item.title}</h3>
                                                        <span className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                                                            item.type === 'template' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                                        }`}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                                                    <div className="flex items-center justify-between text-xs">
                                                        <span className={`px-2 py-1 rounded-full ${
                                                            (item.status === 'approved' || item.approval_status === 'approved') ? 'bg-green-500/20 text-green-400' :
                                                            (item.status === 'pending_approval' || item.approval_status === 'pending_approval') ? 'bg-yellow-500/20 text-yellow-400' :
                                                            'bg-gray-500/20 text-gray-400'
                                                        }`}>
                                                            {item.status || item.approval_status || 'Draft'}
                                                        </span>
                                                        <div className="flex items-center space-x-2 text-gray-400">
                                                            <span className="flex items-center">
                                                                <Eye className="w-3 h-3 mr-1" />
                                                                {item.views || 0}
                                                            </span>
                                                            <span className="flex items-center">
                                                                <Download className="w-3 h-3 mr-1" />
                                                                {item.downloads || 0}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold text-gray-300 mb-2">No content yet</h3>
                                        <p className="text-gray-500 mb-4">Upload your first template or component to get started!</p>
                                        <button 
                                            onClick={() => setActiveTab('upload')}
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center mx-auto"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Upload Now
                                        </button>
                                    </div>
                                )}
                            </div>
                            {/* Recent Sales */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Recent Sales</h2>
                                {earnings?.recent_sales?.length > 0 ? (
                                    <div className="space-y-4">
                                        {earnings.recent_sales.slice(0, 5).map((sale, index) => (
                                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-white">{sale.item_title}</h3>
                                                        <p className="text-sm text-gray-400">{sale.item_type}</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            {new Date(sale.sale_date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-green-400 font-medium flex items-center">
                                                        <Award className="w-4 h-4 mr-1" />
                                                        {sale.plan_type || 'Free'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No sales yet. Keep creating great content!</p>
                                )}
                            </div>

                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">My Content</h2>
                                
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={contentFilter}
                                        onChange={(e) => setContentFilter(e.target.value)}
                                        className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                                    >
                                        <option value="all">All Content</option>
                                        <option value="template">Templates</option>
                                        <option value="component">Components</option>
                                    </select>
                                    
                                    <button 
                                        onClick={() => setActiveTab('upload')}
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Upload New
                                    </button>
                                </div>
                            </div>

                            {filteredContent.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredContent.map((item, index) => (
                                        <div key={item.id || index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
                                            {/* Image Preview */}
                                            {item.image_url && (
                                                <div className="mb-3 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                                                    <img 
                                                        src={item.image_url} 
                                                        alt={item.title}
                                                        className="w-full h-full object-cover"
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                        }}
                                                    />
                                                </div>
                                            )}
                                            
                                            <div className="mb-3">
                                                <div className="flex items-start justify-between mb-2">
                                                    <h3 className="font-medium text-white text-sm leading-tight">{item.title}</h3>
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ml-2 whitespace-nowrap ${
                                                        item.type === 'template' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                        {item.type}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                    (item.status === 'approved' || item.approval_status === 'approved') ? 'bg-green-500/20 text-green-400' :
                                                    (item.status === 'pending_approval' || item.approval_status === 'pending_approval') ? 'bg-yellow-500/20 text-yellow-400' :
                                                    (item.status === 'rejected' || item.approval_status === 'rejected') ? 'bg-red-500/20 text-red-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                    {item.status || item.approval_status || 'Draft'}
                                                </span>
                                            </div>
                                            
                                            {/* Stats */}
                                            <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
                                                <div className="bg-white/5 rounded p-2 text-center">
                                                    <div className="flex items-center justify-center text-green-400 mb-1">
                                                        <Eye className="w-3 h-3 mr-1" />
                                                    </div>
                                                    <div className="text-white font-medium">{item.views || 0}</div>
                                                    <div className="text-gray-400">Views</div>
                                                </div>
                                                <div className="bg-white/5 rounded p-2 text-center">
                                                    <div className="flex items-center justify-center text-blue-400 mb-1">
                                                        <Download className="w-3 h-3 mr-1" />
                                                    </div>
                                                    <div className="text-white font-medium">{item.downloads || item.download_count || 0}</div>
                                                    <div className="text-gray-400">Downloads</div>
                                                </div>
                                                <div className="bg-white/5 rounded p-2 text-center">
                                                    <div className="flex items-center justify-center text-yellow-400 mb-1">
                                                        <Star className="w-3 h-3 mr-1" />
                                                    </div>
                                                    <div className="text-white font-medium">{item.likes || 0}</div>
                                                    <div className="text-gray-400">Likes</div>
                                                </div>
                                                <div className="bg-white/5 rounded p-2 text-center">
                                                    <div className="flex items-center justify-center text-purple-400 mb-1">
                                                        <MessageSquare className="w-3 h-3 mr-1" />
                                                    </div>
                                                    <div className="text-white font-medium">{item.comments_count || 0}</div>
                                                    <div className="text-gray-400">Comments</div>
                                                </div>
                                            </div>

                                            {/* Plan Type */}
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center">
                                                    <Award className="w-4 h-4 mr-1 text-yellow-400" />
                                                    <span className="text-gray-300 font-medium text-sm">
                                                        {item.plan_type || 'Free'}
                                                    </span>
                                                </div>
                                              
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex space-x-2">
                                                <Link 
                                                    href={item.type === 'template' ? `/templates/${item.id}` : `/components/${item.id}`}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                >
                                                    <Eye className="w-3 h-3 mr-1" />
                                                    View
                                                </Link>
                                                <Link 
                                                    href={item.type === 'template' ? `/templates/${item.id}/edit` : `/components/${item.id}/edit`}
                                                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                >
                                                    <Edit className="w-3 h-3 mr-1" />
                                                    Edit
                                                </Link>
                                            </div>

                                            {/* Creation Date */}
                                            <div className="mt-2 pt-2 border-t border-white/10">
                                                <p className="text-xs text-gray-500 flex items-center">
                                                    <Clock className="w-3 h-3 mr-1" />
                                                    Created: {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Unknown'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <Upload className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No content uploaded yet</h3>
                                    <p className="text-gray-500 mb-6">Start uploading templates and components to earn money!</p>
                                    <button 
                                        onClick={() => setActiveTab('upload')}
                                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center mx-auto"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Upload Your First Item
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 text-center">
                            <h2 className="text-2xl font-semibold text-white mb-4">Content Analytics</h2>
                            <p className="text-gray-400 mb-6">Track your content performance and engagement.</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-white font-medium mb-2">Total Downloads</h3>
                                    <p className="text-2xl font-bold text-blue-400">{myContent.reduce((total, item) => total + (item.download_count || 0), 0)}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-white font-medium mb-2">Total Views</h3>
                                    <p className="text-2xl font-bold text-green-400">{myContent.reduce((total, item) => total + (item.view_count || 0), 0)}</p>
                                </div>
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-white font-medium mb-2">Active Content</h3>
                                    <p className="text-2xl font-bold text-purple-400">{myContent.length}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="space-y-6">
                            {/* Analytics Overview */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Analytics Overview</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                                        <div className="p-3 bg-green-500/20 rounded-lg mx-auto w-fit mb-3">
                                            <Eye className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {myContent.reduce((sum, item) => sum + (item.views || 0), 0).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-400">Total Views</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                                        <div className="p-3 bg-blue-500/20 rounded-lg mx-auto w-fit mb-3">
                                            <Download className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {myContent.reduce((sum, item) => sum + (item.downloads || 0), 0).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-400">Total Downloads</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                                        <div className="p-3 bg-yellow-500/20 rounded-lg mx-auto w-fit mb-3">
                                            <Star className="w-6 h-6 text-yellow-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {myContent.reduce((sum, item) => sum + (item.likes || 0), 0).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-gray-400">Total Likes</div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10 text-center">
                                        <div className="p-3 bg-purple-500/20 rounded-lg mx-auto w-fit mb-3">
                                            <TrendingUp className="w-6 h-6 text-purple-400" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {((myContent.reduce((sum, item) => sum + (item.downloads || 0), 0) / 
                                               Math.max(myContent.reduce((sum, item) => sum + (item.views || 0), 1), 1)) * 100).toFixed(1)}%
                                        </div>
                                        <div className="text-sm text-gray-400">Conversion Rate</div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Performing Content */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-6">Top Performing Content</h2>
                                {myContent.length > 0 ? (
                                    <div className="space-y-4">
                                        {myContent
                                            .sort((a, b) => (b.downloads || 0) - (a.downloads || 0))
                                            .slice(0, 8)
                                            .map((item, index) => (
                                                <div key={item.id || index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="flex items-center space-x-3 mb-2">
                                                                <span className="text-sm font-medium text-white">#{index + 1}</span>
                                                                <h3 className="font-medium text-white">{item.title}</h3>
                                                                <span className={`px-2 py-1 text-xs rounded-full ${
                                                                    item.type === 'template' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                                                }`}>
                                                                    {item.type}
                                                                </span>
                                                            </div>
                                                            <p className="text-sm text-gray-400">{item.category}</p>
                                                        </div>
                                                        <div className="flex items-center space-x-6 text-sm">
                                                            <div className="text-center">
                                                                <div className="flex items-center text-green-400 mb-1">
                                                                    <Eye className="w-4 h-4 mr-1" />
                                                                    {(item.views || 0).toLocaleString()}
                                                                </div>
                                                                <div className="text-xs text-gray-500">Views</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="flex items-center text-blue-400 mb-1">
                                                                    <Download className="w-4 h-4 mr-1" />
                                                                    {(item.downloads || 0).toLocaleString()}
                                                                </div>
                                                                <div className="text-xs text-gray-500">Downloads</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="flex items-center text-yellow-400 mb-1">
                                                                    <Star className="w-4 h-4 mr-1" />
                                                                    {(item.likes || 0).toLocaleString()}
                                                                </div>
                                                                <div className="text-xs text-gray-500">Likes</div>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="text-purple-400 font-medium mb-1">
                                                                    {item.views > 0 ? ((item.downloads || 0) / item.views * 100).toFixed(1) : 0}%
                                                                </div>
                                                                <div className="text-xs text-gray-500">Conversion</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <BarChart3 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No Analytics Data</h3>
                                        <p className="text-gray-500 mb-6">Upload content to start tracking analytics!</p>
                                        <button 
                                            onClick={() => setActiveTab('upload')}
                                            className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center mx-auto"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Upload Content
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {activeTab === 'upload' && (
                        <div className="space-y-6">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-8 text-center">
                                <h2 className="text-2xl font-semibold text-white mb-4">Upload New Content</h2>
                                <p className="text-gray-400 mb-8">Share your creations with the community</p>
                                
                                <div className="flex justify-center space-x-6">
                                    <Link 
                                        href="/templates/create"
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-8 rounded-lg transition-colors flex items-center space-x-2 text-decoration-none"
                                    >
                                        <Package className="w-5 h-5" />
                                        <span>Upload Template</span>
                                    </Link>
                                    
                                    <Link 
                                        href="/components/create"
                                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors flex items-center space-x-2 text-decoration-none"
                                    >
                                        <Star className="w-5 h-5" />
                                        <span>Upload Component</span>
                                    </Link>
                                </div>
                                
                                <div className="mt-8 text-sm text-gray-500">
                                    <p>Templates: Full project layouts, landing pages, and complete designs</p>
                                    <p>Components: Individual UI elements, buttons, forms, and reusable parts</p>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
};

export default DeveloperDashboard;



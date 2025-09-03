/**
 * Enhanced User Dashboard Page
 * Includes purchase history, recommendations, and account details
 */

'use client';
import React, { useState, useEffect } from 'react';
import { 
    ShoppingCart, 
    Download, 
    Star, 
    IndianRupee, 
    Calendar, 
    TrendingUp,
    Eye,
    Heart,
    Search,
    Filter
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { paymentApi } from '../../../lib/paymentApi';
import { marketplaceApi } from '../../../lib/marketplaceApi';
import ProtectedRoute from '../../shared/ProtectedRoute';
import AnalyticsDashboard from '../../analytics/AnalyticsDashboard';

const EnhancedUserDashboard = () => {
    const { user } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [purchasedItems, setPurchasedItems] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [purchaseFilter, setPurchaseFilter] = useState('all');

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'purchases', label: 'My Purchases', icon: ShoppingCart },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'recommendations', label: 'Recommended', icon: Heart }
    ];

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            
            // Load user dashboard data
            const [dashboardResponse, purchasesResponse] = await Promise.all([
                paymentApi.getUserDashboard(),
                paymentApi.getPurchasedItems({ limit: 20 })
            ]);

            setDashboardData(dashboardResponse);
            setPurchasedItems(purchasesResponse.purchases || []);

            // Load recommendations (could be based on purchases)
            if (purchasesResponse.purchases?.length > 0) {
                try {
                    const recResponse = await marketplaceApi.getTemplates({ 
                        limit: 6, 
                        sort_by: 'popular' 
                    });
                    setRecommendations(recResponse.templates || []);
                } catch (error) {
                    console.error('Failed to load recommendations:', error);
                }
            }

        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadTemplate = (item) => {
        alert(`Downloading ${item.title}...`);
        // Add actual download logic here
    };

    const filteredPurchases = purchasedItems.filter(item => {
        if (purchaseFilter === 'all') return true;
        return item.item_type === purchaseFilter;
    });

    const stats = dashboardData ? [
        {
            title: 'Total Purchases',
            value: dashboardData.total_purchases || 0,
            icon: ShoppingCart,
            color: 'blue'
        },
        {
            title: 'Total Spent',
            value: `₹${dashboardData.total_spent_inr || 0}`,
            icon: IndianRupee,
            color: 'green'
        },
        {
            title: 'Templates Owned',
            value: dashboardData.templates_owned || 0,
            icon: TrendingUp,
            color: 'purple'
        },
        {
            title: 'Components Owned',
            value: dashboardData.components_owned || 0,
            icon: Star,
            color: 'orange'
        }
    ] : [];

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                            <p className="text-white mt-4">Loading your dashboard...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
                            <div className="flex items-center space-x-4">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30">
                                    <span className="text-3xl font-bold text-white">
                                        {user?.firstName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">
                                        Welcome back, {user?.firstName || user?.name || 'User'}!
                                    </h1>
                                    <p className="text-purple-100">
                                        Manage your marketplace purchases and account
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-300 text-sm font-medium">{stat.title}</p>
                                        <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                                    </div>
                                    <div className={`p-3 bg-${stat.color}-500/20 rounded-lg`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                                    </div>
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
                                            ? 'text-blue-400 border-b-2 border-blue-400'
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
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent Purchases */}
                            <div className="lg:col-span-2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Recent Purchases</h2>
                                {purchasedItems.slice(0, 3).length > 0 ? (
                                    <div className="space-y-4">
                                        {purchasedItems.slice(0, 3).map((item, index) => (
                                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-medium text-white">{item.item_title}</h3>
                                                        <p className="text-sm text-gray-400">
                                                            {item.item_type === 'template' ? 'Template' : 'Component'}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Purchased on {new Date(item.purchase_date).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="text-green-400 font-medium flex items-center">
                                                        <IndianRupee className="w-4 h-4" />
                                                        {item.price_paid_inr}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-400">No purchases yet. Explore our marketplace!</p>
                                )}
                            </div>

                            {/* Quick Actions */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                                <div className="space-y-3">
                                    <button
                                        onClick={() => setActiveTab('purchases')}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center"
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        View All Purchases
                                    </button>
                                    <a
                                        href="/templates"
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <Search className="w-4 h-4 mr-2" />
                                        Browse Templates
                                    </a>
                                    <a
                                        href="/components"
                                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                                    >
                                        <Search className="w-4 h-4 mr-2" />
                                        Browse Components
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'purchases' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">My Purchases</h2>
                                
                                {/* Filter */}
                                <div className="flex items-center space-x-4">
                                    <select
                                        value={purchaseFilter}
                                        onChange={(e) => setPurchaseFilter(e.target.value)}
                                        className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                                    >
                                        <option value="all">All Items</option>
                                        <option value="template">Templates</option>
                                        <option value="component">Components</option>
                                    </select>
                                </div>
                            </div>

                            {filteredPurchases.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredPurchases.map((item, index) => (
                                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
                                            <div className="mb-3">
                                                <h3 className="font-medium text-white mb-1">{item.item_title}</h3>
                                                <p className="text-sm text-gray-400">
                                                    {item.item_type === 'template' ? 'Template' : 'Component'}
                                                </p>
                                            </div>
                                            
                                            <div className="flex justify-between items-center mb-3">
                                                <div className="text-green-400 font-medium flex items-center">
                                                    <IndianRupee className="w-4 h-4" />
                                                    {item.price_paid_inr}
                                                </div>
                                                <span className="text-xs text-gray-500">
                                                    {new Date(item.purchase_date).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="flex space-x-2">
                                                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center">
                                                    <Download className="w-4 h-4 mr-1" />
                                                    Download
                                                </button>
                                                <button className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-300 mb-2">No purchases yet</h3>
                                    <p className="text-gray-500 mb-6">Start exploring our marketplace to find amazing templates and components!</p>
                                    <div className="flex justify-center space-x-4">
                                        <a
                                            href="/templates"
                                            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                        >
                                            Browse Templates
                                        </a>
                                        <a
                                            href="/components"
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                                        >
                                            Browse Components
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <AnalyticsDashboard userRole="user" />
                        </div>
                    )}

                    {activeTab === 'recommendations' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Recommended for You</h2>
                            
                            {recommendations.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {recommendations.map((item, index) => (
                                        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
                                            <div className="mb-3">
                                                <h3 className="font-medium text-white mb-1">{item.title}</h3>
                                                <p className="text-sm text-gray-400">{item.category}</p>
                                            </div>
                                            
                                            <div className="flex items-center space-x-4 mb-3 text-sm text-gray-400">
                                                <div className="flex items-center">
                                                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                    {item.average_rating || 0}
                                                </div>
                                                <div className="flex items-center">
                                                    <Download className="w-4 h-4 mr-1" />
                                                    {item.download_count || 0}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => handleDownloadTemplate(item)}
                                                className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                                            >
                                                <Download className="w-4 h-4" />
                                                Download
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400 text-center py-8">
                                    Make your first purchase to get personalized recommendations!
                                </p>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </ProtectedRoute>
    );
};

export default EnhancedUserDashboard;


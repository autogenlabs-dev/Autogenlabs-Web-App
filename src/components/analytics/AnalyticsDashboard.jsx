/**
 * Analytics Dashboard Component
 * Comprehensive analytics display for different user roles
 */

'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    TrendingUp,
    TrendingDown,
    Users,
    Download,
    ShoppingCart,
    IndianRupee,
    Eye,
    Heart,
    MessageCircle,
    Package,
    Calendar,
    Filter,
    BarChart3,
    PieChart,
    LineChart,
    Activity,
    Target,
    Zap,
    Star,
    Award
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { marketplaceApi } from '@/lib/marketplaceApi';
import { adminApi } from '@/lib/adminApi';
import { developerApi } from '@/lib/developerApi';

const AnalyticsDashboard = ({ userRole = 'user', period = '7d' }) => {
    const { user } = useAuth();
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedMetric, setSelectedMetric] = useState(null);
    const [timeRange, setTimeRange] = useState(period);

    const timeRanges = [
        { value: '7d', label: '7 Days' },
        { value: '30d', label: '30 Days' },
        { value: '90d', label: '3 Months' },
        { value: '1y', label: '1 Year' }
    ];

    useEffect(() => {
        fetchAnalytics();
    }, [userRole, timeRange]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            let data = {};

            switch (userRole) {
                case 'admin':
                    data = await adminApi.getAnalytics(timeRange);
                    break;
                case 'developer':
                    data = await developerApi.getAnalytics(timeRange);
                    break;
                default:
                    data = await marketplaceApi.getUserAnalytics(timeRange);
                    break;
            }

            setAnalytics(data);
        } catch (error) {
            console.error('Failed to fetch analytics:', error);
        } finally {
            setLoading(false);
        }
    };

    // Mock data for demonstration
    const mockAnalytics = {
        admin: {
            overview: {
                totalUsers: 15847,
                totalRevenue: 892450,
                totalDownloads: 245789,
                totalItems: 1247,
                growthRate: 12.5,
                conversionRate: 3.2
            },
            charts: {
                userGrowth: [
                    { date: '2024-01-01', users: 12000, revenue: 450000 },
                    { date: '2024-01-02', users: 12150, revenue: 465000 },
                    { date: '2024-01-03', users: 12300, revenue: 480000 },
                    { date: '2024-01-04', users: 12500, revenue: 495000 },
                    { date: '2024-01-05', users: 12750, revenue: 520000 },
                    { date: '2024-01-06', users: 13000, revenue: 545000 },
                    { date: '2024-01-07', users: 13250, revenue: 570000 }
                ],
                categories: [
                    { name: 'Templates', value: 45, revenue: 520000 },
                    { name: 'Components', value: 35, revenue: 280000 },
                    { name: 'Icons', value: 20, revenue: 92450 }
                ],
                topItems: [
                    { name: 'Modern Dashboard Template', downloads: 1250, revenue: 87500 },
                    { name: 'React Button Component', downloads: 985, revenue: 29550 },
                    { name: 'E-commerce Landing Page', downloads: 876, revenue: 78840 }
                ]
            }
        },
        developer: {
            overview: {
                totalItems: 12,
                totalRevenue: 45750,
                totalDownloads: 2847,
                averageRating: 4.7,
                monthlyEarnings: 12500,
                activeProjects: 8
            },
            charts: {
                earnings: [
                    { date: '2024-01-01', earnings: 8500 },
                    { date: '2024-01-02', earnings: 9200 },
                    { date: '2024-01-03', earnings: 9800 },
                    { date: '2024-01-04', earnings: 10500 },
                    { date: '2024-01-05', earnings: 11200 },
                    { date: '2024-01-06', earnings: 11800 },
                    { date: '2024-01-07', earnings: 12500 }
                ],
                itemPerformance: [
                    { name: 'Modern Card Component', downloads: 245, revenue: 7350, rating: 4.9 },
                    { name: 'Dashboard Template', downloads: 189, revenue: 15120, rating: 4.8 },
                    { name: 'Loading Animations', downloads: 156, revenue: 4680, rating: 4.6 }
                ]
            }
        },
        user: {
            overview: {
                totalDownloads: 23,
                totalSpent: 2850,
                favoriteItems: 8,
                recentActivity: 12
            },
            charts: {
                spendingHistory: [
                    { date: '2024-01-01', amount: 150 },
                    { date: '2024-01-02', amount: 300 },
                    { date: '2024-01-03', amount: 450 },
                    { date: '2024-01-04', amount: 750 },
                    { date: '2024-01-05', amount: 1200 },
                    { date: '2024-01-06', amount: 1850 },
                    { date: '2024-01-07', amount: 2850 }
                ],
                downloadedCategories: [
                    { name: 'Templates', value: 60 },
                    { name: 'Components', value: 30 },
                    { name: 'Icons', value: 10 }
                ]
            }
        }
    };

    const currentAnalytics = analytics || mockAnalytics[userRole];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
        );
    }

    const MetricCard = ({ title, value, change, icon: Icon, color = 'blue', prefix = '', suffix = '' }) => (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 cursor-pointer"
            onClick={() => setSelectedMetric({ title, value, change })}
        >
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-white mt-1">
                        {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
                    </p>
                    {change !== undefined && (
                        <div className={`flex items-center mt-2 text-sm ${
                            change >= 0 ? 'text-green-400' : 'text-red-400'
                        }`}>
                            {change >= 0 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                            {Math.abs(change)}% from last period
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-lg bg-${color}-500/20`}>
                    <Icon className={`w-6 h-6 text-${color}-400`} />
                </div>
            </div>
        </motion.div>
    );

    const SimpleChart = ({ data, type = 'line', height = 200 }) => (
        <div className={`relative bg-gray-800/50 rounded-lg p-4`} style={{ height }}>
            <div className="text-center text-gray-400 text-sm">
                {type === 'line' && '📈 Line Chart'}
                {type === 'bar' && '📊 Bar Chart'}
                {type === 'pie' && '🥧 Pie Chart'}
            </div>
            <div className="mt-4 text-xs text-gray-500">
                Chart visualization would render here with actual chart library
            </div>
            {/* Placeholder chart representation */}
            <div className="mt-4 flex items-end space-x-2 h-24">
                {data?.slice(0, 7).map((_, index) => (
                    <div
                        key={index}
                        className="flex-1 bg-blue-500/30 rounded-t"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                    />
                ))}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div>
                    <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
                    <p className="text-gray-400 mt-1">
                        {userRole === 'admin' && 'Platform-wide insights and performance metrics'}
                        {userRole === 'developer' && 'Your content performance and earnings'}
                        {userRole === 'user' && 'Your activity and spending insights'}
                    </p>
                </div>

                <div className="flex items-center space-x-4">
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                    >
                        {timeRanges.map(range => (
                            <option key={range.value} value={range.value}>
                                {range.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {userRole === 'admin' && currentAnalytics?.overview && (
                    <>
                        <MetricCard
                            title="Total Users"
                            value={currentAnalytics.overview.totalUsers}
                            change={12.5}
                            icon={Users}
                            color="blue"
                        />
                        <MetricCard
                            title="Total Revenue"
                            value={currentAnalytics.overview.totalRevenue}
                            change={8.3}
                            icon={IndianRupee}
                            color="green"
                            prefix="₹"
                        />
                        <MetricCard
                            title="Total Downloads"
                            value={currentAnalytics.overview.totalDownloads}
                            change={15.2}
                            icon={Download}
                            color="purple"
                        />
                        <MetricCard
                            title="Total Items"
                            value={currentAnalytics.overview.totalItems}
                            change={5.7}
                            icon={Package}
                            color="orange"
                        />
                    </>
                )}

                {userRole === 'developer' && currentAnalytics?.overview && (
                    <>
                        <MetricCard
                            title="Total Items"
                            value={currentAnalytics.overview.totalItems}
                            change={2}
                            icon={Package}
                            color="blue"
                        />
                        <MetricCard
                            title="Monthly Earnings"
                            value={currentAnalytics.overview.monthlyEarnings}
                            change={18.5}
                            icon={IndianRupee}
                            color="green"
                            prefix="₹"
                        />
                        <MetricCard
                            title="Total Downloads"
                            value={currentAnalytics.overview.totalDownloads}
                            change={22.3}
                            icon={Download}
                            color="purple"
                        />
                        <MetricCard
                            title="Average Rating"
                            value={currentAnalytics.overview.averageRating}
                            change={3.2}
                            icon={Star}
                            color="yellow"
                            suffix=" ⭐"
                        />
                    </>
                )}

                {userRole === 'user' && currentAnalytics?.overview && (
                    <>
                        <MetricCard
                            title="Total Downloads"
                            value={currentAnalytics.overview.totalDownloads}
                            icon={Download}
                            color="blue"
                        />
                        <MetricCard
                            title="Total Spent"
                            value={currentAnalytics.overview.totalSpent}
                            icon={IndianRupee}
                            color="green"
                            prefix="₹"
                        />
                        <MetricCard
                            title="Favorite Items"
                            value={currentAnalytics.overview.favoriteItems}
                            icon={Heart}
                            color="red"
                        />
                        <MetricCard
                            title="Recent Activity"
                            value={currentAnalytics.overview.recentActivity}
                            icon={Activity}
                            color="purple"
                        />
                    </>
                )}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Primary Chart */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            {userRole === 'admin' && 'User Growth & Revenue'}
                            {userRole === 'developer' && 'Earnings Over Time'}
                            {userRole === 'user' && 'Spending History'}
                        </h3>
                        <LineChart className="w-5 h-5 text-blue-400" />
                    </div>
                    <SimpleChart
                        data={currentAnalytics?.charts?.[
                            userRole === 'admin' ? 'userGrowth' :
                            userRole === 'developer' ? 'earnings' :
                            'spendingHistory'
                        ]}
                        type="line"
                        height={300}
                    />
                </div>

                {/* Secondary Chart */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-semibold text-white">
                            {userRole === 'admin' && 'Category Distribution'}
                            {userRole === 'developer' && 'Item Performance'}
                            {userRole === 'user' && 'Download Categories'}
                        </h3>
                        <PieChart className="w-5 h-5 text-green-400" />
                    </div>
                    <SimpleChart
                        data={currentAnalytics?.charts?.[
                            userRole === 'admin' ? 'categories' :
                            userRole === 'developer' ? 'itemPerformance' :
                            'downloadedCategories'
                        ]}
                        type="pie"
                        height={300}
                    />
                </div>
            </div>

            {/* Detailed Tables */}
            {userRole === 'admin' && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-6">Top Performing Items</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-3 text-gray-400 font-medium">Item</th>
                                    <th className="pb-3 text-gray-400 font-medium">Downloads</th>
                                    <th className="pb-3 text-gray-400 font-medium">Revenue</th>
                                    <th className="pb-3 text-gray-400 font-medium">Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAnalytics?.charts?.topItems?.map((item, index) => (
                                    <tr key={index} className="border-b border-white/5">
                                        <td className="py-3 text-white">{item.name}</td>
                                        <td className="py-3 text-gray-300">{item.downloads.toLocaleString()}</td>
                                        <td className="py-3 text-green-400">₹{item.revenue.toLocaleString()}</td>
                                        <td className="py-3">
                                            <span className="flex items-center text-green-400">
                                                <TrendingUp className="w-4 h-4 mr-1" />
                                                {Math.floor(Math.random() * 20 + 5)}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {userRole === 'developer' && (
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-6">Your Item Performance</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="pb-3 text-gray-400 font-medium">Item</th>
                                    <th className="pb-3 text-gray-400 font-medium">Downloads</th>
                                    <th className="pb-3 text-gray-400 font-medium">Revenue</th>
                                    <th className="pb-3 text-gray-400 font-medium">Rating</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentAnalytics?.charts?.itemPerformance?.map((item, index) => (
                                    <tr key={index} className="border-b border-white/5">
                                        <td className="py-3 text-white">{item.name}</td>
                                        <td className="py-3 text-gray-300">{item.downloads}</td>
                                        <td className="py-3 text-green-400">₹{item.revenue.toLocaleString()}</td>
                                        <td className="py-3">
                                            <div className="flex items-center">
                                                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                                                <span className="text-white">{item.rating}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Additional Insights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Quick Stats</h4>
                        <Target className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Conversion Rate</span>
                            <span className="text-white">
                                {userRole === 'admin' ? '3.2%' : userRole === 'developer' ? '4.7%' : '12.5%'}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Growth Rate</span>
                            <span className="text-green-400">+12.5%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Active Sessions</span>
                            <span className="text-white">
                                {userRole === 'admin' ? '1,247' : userRole === 'developer' ? '89' : '23'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Performance</h4>
                        <Zap className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="space-y-3">
                        <div className="flex justify-between">
                            <span className="text-gray-400">Page Load Time</span>
                            <span className="text-green-400">1.2s</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Uptime</span>
                            <span className="text-green-400">99.9%</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-400">Cache Hit Rate</span>
                            <span className="text-green-400">95.2%</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-white">Achievements</h4>
                        <Award className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="space-y-3">
                        {userRole === 'admin' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">10K+ Users</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">₹1M+ Revenue</span>
                                </div>
                            </>
                        )}
                        {userRole === 'developer' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">Top Seller</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">4.8+ Rating</span>
                                </div>
                            </>
                        )}
                        {userRole === 'user' && (
                            <>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">Active Member</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    <span className="text-gray-300 text-sm">20+ Downloads</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;

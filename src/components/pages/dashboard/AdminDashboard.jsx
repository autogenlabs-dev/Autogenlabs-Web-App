/**
 * Admin Dashboard Page
 * For platform administrators to manage users, content, analytics, and platform settings
 */

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNotification } from '../../../contexts/NotificationContext';
import { 
    Users, 
    Package, 
    DollarSign, 
    TrendingUp,
    Shield,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    BarChart3,
    Settings,
    Eye,
    Edit,
    Trash2,
    Search,
    Filter,
    Download,
    Star,
    MessageSquare,
    Crown,
    Award,
    Activity,
    Key
} from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import { adminApi } from '../../../lib/adminApi';
import ProtectedRoute from '../../shared/ProtectedRoute';
import AnalyticsDashboard from '../../analytics/AnalyticsDashboard';
import ManagedApiKeysTab from './ManagedApiKeysTab';

const AdminDashboard = () => {
    const { user, getToken } = useAuth();
    const router = useRouter();
    const { showSuccess, showError, showWarning, showInfo } = useNotification();
    const [dashboardData, setDashboardData] = useState(null);
    const [users, setUsers] = useState([]);
    const [content, setContent] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [userFilter, setUserFilter] = useState('all');
    const [contentFilter, setContentFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    // User management modals
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userFormData, setUserFormData] = useState({
        name: '',
        email: '',
        role: 'user',
        status: 'active'
    });

    const tabs = [
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'content', label: 'Content', icon: Package },
        { id: 'api-keys', label: 'API Keys', icon: Key },
        { id: 'settings', label: 'Settings', icon: Settings }
    ];

    useEffect(() => {
        // Only load data if getToken is available
        if (getToken && typeof getToken === 'function') {
            loadAdminData();
        } else {
            console.warn('⚠️ getToken not available yet, skipping loadAdminData');
        }
    }, [getToken]);

    const loadAdminData = async () => {
        try {
            setLoading(true);
            
            const token = await getToken();
            if (!token) {
                console.warn('⚠️ No auth token available for AdminDashboard');
                setLoading(false);
                return;
            }

            console.log('🔑 AdminDashboard: Token obtained, fetching users...');

            // Fetch real users from Clerk via our API endpoint
            try {
                const usersResponse = await fetch('/api/admin/users?limit=100', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                console.log('📡 Users API response status:', usersResponse.status);

                if (usersResponse.ok) {
                    const usersData = await usersResponse.json();
                    console.log('✅ Loaded users from Clerk:', usersData);
                    setUsers(usersData.users || []);
                    
                    // Update analytics with real user count
                    setAnalytics({
                        total_users: usersData.total || usersData.users?.length || 0,
                        total_content: 0,
                        approved_content: 0,
                        pending_content: 0,
                        total_templates: 0,
                        total_revenue: 0,
                        active_users: usersData.users?.filter(u => u.status === 'active').length || 0,
                        users: { total: usersData.total || usersData.users?.length || 0 },
                        content: {
                            totals: {
                                all_content: 0,
                                approved_content: 0,
                                pending_content: 0
                            }
                        }
                    });
                } else {
                    const errorText = await usersResponse.text();
                    console.error('❌ Failed to fetch users:', usersResponse.status, errorText);
                    throw new Error(`Failed to fetch users: ${usersResponse.status}`);
                }
            } catch (fetchError) {
                console.error('❌ Error fetching users from Clerk:', fetchError);
                // Fallback to placeholder data
                setUsers([
                    {
                        id: user.id,
                        name: user.name || user.firstName,
                        email: user.email,
                        role: user.role,
                        status: 'active',
                        created_at: new Date().toISOString()
                    }
                ]);
                
                setAnalytics({
                    total_users: 1,
                    total_content: 0,
                    approved_content: 0,
                    pending_content: 0,
                    total_templates: 0,
                    total_revenue: 0,
                    active_users: 1,
                    users: { total: 1 },
                    content: {
                        totals: {
                            all_content: 0,
                            approved_content: 0,
                            pending_content: 0
                        }
                    }
                });
            }
            
            // Content endpoints not implemented yet
            setContent([]);

        } catch (error) {
            console.error('❌ Failed to load admin data (outer catch):', error);
            // Set minimal data on error
            setUsers([]);
            setContent([]);
            setAnalytics({
                total_users: 0,
                total_content: 0,
                approved_content: 0,
                pending_content: 0,
                total_templates: 0,
                total_revenue: 0,
                active_users: 0,
                users: { total: 0 },
                content: {
                    totals: {
                        all_content: 0,
                        approved_content: 0,
                        pending_content: 0
                    }
                }
            });
        } finally {
            setLoading(false);
        }
    };

    const handleApproveContent = async (contentId) => {
        try {
            console.log('Approving content with ID:', contentId);
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            // Find the content item to get its type
            const contentItem = content.find(item => item.id === contentId);
            const contentType = contentItem?.content_type || 'template';
            
            await adminApi.approveContent(contentId, { 
                status: 'approved',
                content_type: contentType 
            }, token);
            
            // Update content list
            setContent(content.map(item => 
                item.id === contentId ? { ...item, status: 'approved' } : item
            ));
            
            showSuccess('Content approved successfully!');
        } catch (error) {
            console.error('Failed to approve content:', error);
            showError('Failed to approve content. Please try again.');
        }
    };

    const handleRejectContent = async (contentId, reason) => {
        try {
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            // Find the content item to get its type
            const contentItem = content.find(item => item.id === contentId);
            const contentType = contentItem?.content_type || 'template';
            
            await adminApi.approveContent(contentId, { 
                status: 'rejected',
                rejection_reason: reason,
                content_type: contentType 
            }, token);
            
            // Update content list
            setContent(content.map(item => 
                item.id === contentId ? { ...item, status: 'rejected' } : item
            ));
            
            showSuccess('Content rejected successfully!');
        } catch (error) {
            console.error('Failed to reject content:', error);
            showError('Failed to reject content. Please try again.');
        }
    };

    const handleManageUser = async (userId, action) => {
        try {
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            await adminApi.manageUser(userId, { action }, token);
            
            // Reload users via our API endpoint
            const usersResponse = await fetch('/api/admin/users?limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                setUsers(usersData.users || []);
            }
            
            showSuccess(`User ${action} successfully!`);
        } catch (error) {
            console.error(`Failed to ${action} user:`, error);
            showError(`Failed to ${action} user. Please try again.`);
        }
    };

    // User management modal functions
    const handleViewUser = (user) => {
        setSelectedUser(user);
        setShowViewModal(true);
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setUserFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        });
        setShowEditModal(true);
    };

    const handleDeleteUser = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const confirmDeleteUser = async () => {
        if (!selectedUser) return;

        try {
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            console.log('Attempting to delete user:', selectedUser.id, selectedUser.email);
            await adminApi.deleteUser(selectedUser.id, token);
            
            // Reload users
            const usersResponse = await fetch('/api/admin/users?limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                setUsers(usersData.users || []);
            }
            
            setShowDeleteModal(false);
            setSelectedUser(null);
            showSuccess(`User ${selectedUser.email} deleted successfully!`);
        } catch (error) {
            console.error('Failed to delete user:', error);
            console.error('Error details:', error.message, error.status);
            showError(`Failed to delete user ${selectedUser.email}. Error: ${error.message || 'Unknown error'}`);
        }
    };

    const confirmEditUser = async () => {
        if (!selectedUser) return;

        try {
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            // Update user role if changed
            if (userFormData.role !== selectedUser.role) {
                await adminApi.updateUserRole(selectedUser.id, userFormData.role, token);
            }

            // Update user status if changed
            if (userFormData.status !== selectedUser.status) {
                const action = userFormData.status === 'active' ? 'activate' : 'suspend';
                await adminApi.manageUser(selectedUser.id, { action }, token);
            }
            
            // Reload users
            const usersResponse = await fetch('/api/admin/users?limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                setUsers(usersData.users || []);
            }
            
            setShowEditModal(false);
            setSelectedUser(null);
            showSuccess('User updated successfully!');
        } catch (error) {
            console.error('Failed to update user:', error);
            showError('Failed to update user. Please try again.');
        }
    };

    const handleSuspendUser = async (userId) => {
        try {
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }
            
            await adminApi.suspendUser(userId, token);
            
            // Reload users
            const usersResponse = await fetch('/api/admin/users?limit=100', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            
            if (usersResponse.ok) {
                const usersData = await usersResponse.json();
                setUsers(usersData.users || []);
            }
            
            showSuccess('User suspended successfully!');
        } catch (error) {
            console.error('Failed to suspend user:', error);
            showError('Failed to suspend user. Please try again.');
        }
    };

    const handleViewContent = (contentId, contentType) => {
        // Navigate to content detail page in same tab
        if (contentType === 'template') {
            router.push(`/templates/${contentId}`);
        } else {
            router.push(`/components/${contentId}`);
        }
    };

    const handleEditContent = (contentId, contentType) => {
        // Navigate to edit page in same tab
        if (contentType === 'template') {
            router.push(`/templates/${contentId}/edit`);
        } else {
            router.push(`/components/${contentId}/edit`);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesFilter = userFilter === 'all' || user.role === userFilter;
        const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const filteredContent = content.filter(item => {
        const matchesFilter = contentFilter === 'all' || item.status === contentFilter;
        const matchesSearch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             item.category?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const stats = analytics ? [
        {
            title: 'Total Users',
            value: analytics.users?.total || analytics.total_users || 0,
            icon: Users,
            color: 'blue',
            change: analytics.user_growth || 0
        },
        {
            title: 'Total Content',
            value: analytics.content?.totals?.all_content || analytics.total_content || 0,
            icon: Package,
            color: 'purple',
            change: analytics.content_growth || 0
        },
        {
            title: 'Active Content',
            value: analytics.content?.totals?.approved_content || analytics.approved_content || 0,
            icon: CheckCircle,
            color: 'green',
            change: analytics.content_growth || 0
        },
        {
            title: 'Pending Approvals',
            value: analytics.content?.totals?.pending_content || analytics.pending_content || 0,
            icon: Clock,
            color: 'orange',
            change: 0
        }
    ] : [];

    if (loading) {
        return (
            <ProtectedRoute requiredRole="admin">
                <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                            <p className="text-white mt-4">Loading admin dashboard...</p>
                        </div>
                    </div>
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute requiredRole="admin">
            <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    
                    {/* Header */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl overflow-hidden mb-8">
                        <div className="bg-gradient-to-r from-red-600 to-purple-600 px-6 py-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30">
                                        <Crown className="w-10 h-10 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-bold text-white">
                                            Admin Dashboard
                                        </h1>
                                        <p className="text-red-100">
                                            Platform management and oversight for {user?.firstName || user?.name || 'Administrator'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex space-x-3">
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Settings
                                    </button>
                                    <button className="bg-white/20 hover:bg-white/30 backdrop-blur-lg border border-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center">
                                        <Download className="w-4 h-4 mr-2" />
                                        Export
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 bg-${stat.color}-500/20 rounded-lg`}>
                                        <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                                    </div>
                                    {stat.change !== 0 && (
                                        <div className={`flex items-center text-sm ${
                                            stat.change > 0 ? 'text-green-400' : 'text-red-400'
                                        }`}>
                                            <TrendingUp className="w-4 h-4 mr-1" />
                                            {stat.change > 0 ? '+' : ''}{stat.change}%
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                                    <p className="text-gray-300 text-sm">{stat.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 mb-8">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search users, content, or anything..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
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
                                            ? 'text-red-400 border-b-2 border-red-400'
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
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Recent Activity */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
                                <div className="space-y-4">
                                    {analytics?.recent_activity?.length > 0 ? (
                                        analytics.recent_activity.slice(0, 5).map((activity, index) => (
                                            <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10">
                                                <div className="flex items-start space-x-3">
                                                    <div className="p-2 bg-blue-500/20 rounded-lg">
                                                        <Activity className="w-4 h-4 text-blue-400" />
                                                    </div>
                                                    <div>
                                                        <p className="text-white text-sm">{activity.description}</p>
                                                        <p className="text-gray-400 text-xs mt-1">
                                                            {new Date(activity.timestamp).toLocaleString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-400">No recent activity.</p>
                                    )}
                                </div>
                            </div>

                            {/* Platform Health */}
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-white mb-4">Platform Health</h2>
                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">System Status</span>
                                            <div className="flex items-center text-green-400">
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Operational
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Content Approval Queue</span>
                                            <span className="text-yellow-400">{analytics?.content?.totals?.pending_content || analytics?.pending_content || 0} pending</span>
                                        </div>
                                    </div>
                                    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">User Reports</span>
                                            <span className="text-red-400">{analytics?.user_reports || 0} open</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'users' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">User Management</h2>
                                
                                <select
                                    value={userFilter}
                                    onChange={(e) => setUserFilter(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                                >
                                    <option value="all">All Users</option>
                                    <option value="user">Regular Users</option>
                                    <option value="developer">Developers</option>
                                    <option value="admin">Administrators</option>
                                </select>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-4 text-gray-300 font-medium">User</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-medium">Role</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-medium">Joined</th>
                                            <th className="text-left py-3 px-4 text-gray-300 font-medium">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, index) => (
                                            <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                                                <td className="py-3 px-4">
                                                    <div>
                                                        <p className="text-white font-medium">{user.name}</p>
                                                        <p className="text-gray-400 text-sm">{user.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                        user.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                                        user.role === 'developer' ? 'bg-green-500/20 text-green-400' :
                                                        'bg-blue-500/20 text-blue-400'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                        user.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                                        user.status === 'suspended' ? 'bg-red-500/20 text-red-400' :
                                                        'bg-yellow-500/20 text-yellow-400'
                                                    }`}>
                                                        {user.status || 'active'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4 text-gray-400 text-sm">
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-2">
                                                        <button 
                                                            onClick={() => handleViewUser(user)}
                                                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                                                            title="View User Details"
                                                        >
                                                            <Eye className="w-3 h-3" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleEditUser(user)}
                                                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                                                            title="Edit User"
                                                        >
                                                            <Edit className="w-3 h-3" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleSuspendUser(user.id)}
                                                            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                                                            title="Suspend User"
                                                        >
                                                            <AlertTriangle className="w-3 h-3" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDeleteUser(user)}
                                                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-medium py-1 px-2 rounded transition-colors"
                                                            title="Delete User"
                                                        >
                                                            <Trash2 className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'content' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-white">Content Approval</h2>
                                
                                <select
                                    value={contentFilter}
                                    onChange={(e) => setContentFilter(e.target.value)}
                                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
                                >
                                    <option value="all">All Content</option>
                                    <option value="pending">Pending Approval</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredContent.map((item, index) => (
                                    <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:border-white/20 transition-colors">
                                        <div className="mb-3">
                                            <h3 className="font-medium text-white mb-1">{item.title}</h3>
                                            <p className="text-sm text-gray-400">{item.category}</p>
                                            <p className="text-xs text-gray-500">by {item.developer_name}</p>
                                        </div>
                                        
                                        <div className="flex items-center justify-between mb-3">
                                            <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                                item.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                                (item.status === 'pending' || item.status === 'pending_approval') ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {item.status === 'pending_approval' ? 'pending' : item.status}
                                            </span>
                                            <div className="text-blue-400 font-medium flex items-center">
                                                <Award className="w-4 h-4 mr-1" />
                                                {item.plan_type || 'Free'}
                                            </div>
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

                                        {(item.status === 'pending' || item.status === 'pending_approval') ? (
                                            <div className="space-y-2">
                                                {/* Action buttons for pending content */}
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleApproveContent(item.id)}
                                                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                    >
                                                        <CheckCircle className="w-4 h-4 mr-1" />
                                                        Approve
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const reason = prompt('Rejection reason:');
                                                            if (reason) {
                                                                handleRejectContent(item.id, reason);
                                                            }
                                                        }}
                                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                    >
                                                        <XCircle className="w-4 h-4 mr-1" />
                                                        Reject
                                                    </button>
                                                </div>
                                                {/* View and Edit buttons for pending content */}
                                                <div className="flex space-x-2">
                                                    <button 
                                                        onClick={() => handleViewContent(item.id, item.content_type)}
                                                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        View
                                                    </button>
                                                    <button 
                                                        onClick={() => handleEditContent(item.id, item.content_type)}
                                                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                    >
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex space-x-2">
                                                <button 
                                                    onClick={() => handleViewContent(item.id, item.content_type)}
                                                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                >
                                                    <Eye className="w-4 h-4 mr-1" />
                                                    View
                                                </button>
                                                <button 
                                                    onClick={() => handleEditContent(item.id, item.content_type)}
                                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center"
                                                >
                                                    <Edit className="w-4 h-4 mr-1" />
                                                    Edit
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <AnalyticsDashboard userRole="admin" />
                        </div>
                    )}

                    {activeTab === 'api-keys' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <ManagedApiKeysTab 
                                getToken={getToken}
                                showSuccess={showSuccess}
                                showError={showError}
                                showInfo={showInfo}
                            />
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                            <h2 className="text-xl font-semibold text-white mb-6">Platform Settings</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-white font-medium mb-3">General Settings</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Platform Commission (%)</span>
                                            <input
                                                type="number"
                                                defaultValue="30"
                                                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white w-20"
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Auto-approve content</span>
                                            <input type="checkbox" className="rounded" />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Allow guest checkout</span>
                                            <input type="checkbox" defaultChecked className="rounded" />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                                    <h3 className="text-white font-medium mb-3">Payment Settings</h3>
                                    <div className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Currency</span>
                                            <select className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white">
                                                <option value="INR">INR (₹)</option>
                                                <option value="USD">USD ($)</option>
                                            </select>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-300">Minimum payout</span>
                                            <input
                                                type="number"
                                                defaultValue="1000"
                                                className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white w-24"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <button className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                                    Save Settings
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            {/* View User Modal */}
            {showViewModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">User Details</h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                                <p className="text-white">{selectedUser.name}</p>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                                <p className="text-white">{selectedUser.email}</p>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Role</label>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    selectedUser.role === 'admin' ? 'bg-red-500/20 text-red-400' :
                                    selectedUser.role === 'developer' ? 'bg-green-500/20 text-green-400' :
                                    'bg-blue-500/20 text-blue-400'
                                }`}>
                                    {selectedUser.role}
                                </span>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Status</label>
                                <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                                    selectedUser.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                    'bg-red-500/20 text-red-400'
                                }`}>
                                    {selectedUser.status}
                                </span>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Joined</label>
                                <p className="text-white">{new Date(selectedUser.created_at).toLocaleDateString()}</p>
                            </div>
                            {selectedUser.subscription && (
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-1">Subscription</label>
                                    <p className="text-white">{selectedUser.subscription}</p>
                                </div>
                            )}
                            {selectedUser.tokens_remaining && (
                                <div>
                                    <label className="block text-gray-300 text-sm font-medium mb-1">Tokens Remaining</label>
                                    <p className="text-white">{selectedUser.tokens_remaining}</p>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {showEditModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Edit User</h3>
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    value={userFormData.name}
                                    onChange={(e) => setUserFormData(prev => ({...prev, name: e.target.value}))}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Name cannot be changed from admin panel</p>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={userFormData.email}
                                    onChange={(e) => setUserFormData(prev => ({...prev, email: e.target.value}))}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                    disabled
                                />
                                <p className="text-xs text-gray-500 mt-1">Email cannot be changed from admin panel</p>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Role</label>
                                <select
                                    value={userFormData.role}
                                    onChange={(e) => setUserFormData(prev => ({...prev, role: e.target.value}))}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="user">User</option>
                                    <option value="developer">Developer</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-300 text-sm font-medium mb-1">Status</label>
                                <select
                                    value={userFormData.status}
                                    onChange={(e) => setUserFormData(prev => ({...prev, status: e.target.value}))}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="active">Active</option>
                                    <option value="suspended">Suspended</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex justify-end space-x-3">
                            <button
                                onClick={() => setShowEditModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmEditUser}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete User Modal */}
            {showDeleteModal && selectedUser && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 w-full max-w-lg mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Delete User</h3>
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="text-gray-400 hover:text-white"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>
                        
                        <div className="mb-6">
                            <p className="text-gray-300 mb-2">
                                Are you sure you want to delete this user? This action cannot be undone.
                            </p>
                            <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 mt-4">
                                <div className="flex items-center">
                                    <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
                                    <div>
                                        <p className="text-red-400 font-medium">Warning</p>
                                        <p className="text-red-300 text-sm">
                                            User: {selectedUser.name} ({selectedUser.email})
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteUser}
                                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                            >
                                Delete User
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </ProtectedRoute>
    );
};

export default AdminDashboard;


/**
 * Managed API Keys Tab - Admin Component
 * Handles bulk adding, viewing, and managing API keys pool
 */

'use client';
import React, { useState, useEffect } from 'react';
import { 
    Key, 
    Plus, 
    Trash2, 
    RefreshCw, 
    Eye, 
    EyeOff,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Download,
    Upload
} from 'lucide-react';

const ManagedApiKeysTab = ({ getToken, showSuccess, showError, showInfo }) => {
    const [apiKeys, setApiKeys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [bulkKeysInput, setBulkKeysInput] = useState('');
    const [labelInput, setLabelInput] = useState('');
    const [visibleKeys, setVisibleKeys] = useState({});

    useEffect(() => {
        loadApiKeys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadApiKeys = async () => {
        try {
            setLoading(true);
            const token = await getToken();
            if (!token) {
                showError('Authentication required');
                return;
            }

            const { adminApi } = await import('../../../lib/adminApi');
            const data = await adminApi.getManagedApiKeys(token);
            setApiKeys(data.keys || []);
        } catch (error) {
            console.error('Failed to load API keys:', error);
            showError('Failed to load API keys');
        } finally {
            setLoading(false);
        }
    };

    const handleBulkAdd = async () => {
        try {
            if (!bulkKeysInput.trim()) {
                showError('Please enter at least one API key');
                return;
            }

            // Parse keys from textarea (one per line or comma-separated)
            const keys = bulkKeysInput
                .split(/[\n,]/)
                .map(k => k.trim())
                .filter(k => k.length > 0);

            if (keys.length === 0) {
                showError('No valid keys found');
                return;
            }

            const token = await getToken();
            const { adminApi } = await import('../../../lib/adminApi');
            
            await adminApi.addManagedApiKeys({
                keys,
                label: labelInput.trim() || 'GLM Keys'
            }, token);

            showSuccess(`Successfully added ${keys.length} API key(s)`);
            setBulkKeysInput('');
            setLabelInput('');
            setShowAddForm(false);
            loadApiKeys();
        } catch (error) {
            console.error('Failed to add API keys:', error);
            showError(error.message || 'Failed to add API keys');
        }
    };

    const handleDeactivate = async (keyId) => {
        if (!confirm('Are you sure you want to deactivate this API key?')) {
            return;
        }

        try {
            const token = await getToken();
            const { adminApi } = await import('../../../lib/adminApi');
            
            await adminApi.deactivateManagedApiKey(keyId, token);
            showSuccess('API key deactivated successfully');
            loadApiKeys();
        } catch (error) {
            console.error('Failed to deactivate key:', error);
            showError(error.message || 'Failed to deactivate key');
        }
    };

    const handleRefreshUserKey = async (userId) => {
        if (!confirm('Force refresh this user\'s API key?')) {
            return;
        }

        try {
            const token = await getToken();
            const { adminApi } = await import('../../../lib/adminApi');
            
            await adminApi.refreshUserManagedApiKey(userId, token);
            showSuccess('User API key refreshed successfully');
            loadApiKeys();
        } catch (error) {
            console.error('Failed to refresh user key:', error);
            showError(error.message || 'Failed to refresh user key');
        }
    };

    const toggleKeyVisibility = (keyId) => {
        setVisibleKeys(prev => ({
            ...prev,
            [keyId]: !prev[keyId]
        }));
    };

    const maskKey = (key) => {
        if (!key) return '';
        if (key.length <= 12) return '••••••••••••';
        return key.substring(0, 8) + '••••••••••••' + key.substring(key.length - 4);
    };

    const getStatusBadge = (key) => {
        if (!key.is_active) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">
                    <XCircle className="w-3 h-3" />
                    Inactive
                </span>
            );
        }
        if (key.assigned_to) {
            return (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Assigned
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                <Clock className="w-3 h-3" />
                Available
            </span>
        );
    };

    const stats = {
        total: apiKeys.length,
        active: apiKeys.filter(k => k.is_active).length,
        assigned: apiKeys.filter(k => k.assigned_to).length,
        available: apiKeys.filter(k => k.is_active && !k.assigned_to).length
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-12">
                <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Key className="w-6 h-6 text-blue-400" />
                        Managed API Keys
                    </h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage and distribute API keys to users
                    </p>
                </div>
                <button
                    onClick={() => setShowAddForm(!showAddForm)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Keys
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Total Keys</p>
                            <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
                        </div>
                        <Key className="w-8 h-8 text-gray-600" />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Active</p>
                            <p className="text-2xl font-bold text-green-400 mt-1">{stats.active}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Assigned</p>
                            <p className="text-2xl font-bold text-blue-400 mt-1">{stats.assigned}</p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-blue-600" />
                    </div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-400 text-sm">Available</p>
                            <p className="text-2xl font-bold text-yellow-400 mt-1">{stats.available}</p>
                        </div>
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                </div>
            </div>

            {/* Bulk Add Form */}
            {showAddForm && (
                <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Bulk Add API Keys</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                Label (optional)
                            </label>
                            <input
                                type="text"
                                value={labelInput}
                                onChange={(e) => setLabelInput(e.target.value)}
                                placeholder="e.g., GLM cluster, Production keys"
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">
                                API Keys (one per line or comma-separated)
                            </label>
                            <textarea
                                value={bulkKeysInput}
                                onChange={(e) => setBulkKeysInput(e.target.value)}
                                placeholder="sk-prod-1&#10;sk-prod-2&#10;sk-prod-3"
                                rows={6}
                                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={handleBulkAdd}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Add Keys
                            </button>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    setBulkKeysInput('');
                                    setLabelInput('');
                                }}
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* API Keys Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    API Key
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Label
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Assigned To
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Assigned At
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {apiKeys.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                                        <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                        No API keys added yet. Click "Add Keys" to get started.
                                    </td>
                                </tr>
                            ) : (
                                apiKeys.map((key) => (
                                    <tr key={key.id} className="hover:bg-gray-700/50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <code className="text-sm font-mono text-gray-300">
                                                    {visibleKeys[key.id] ? key.raw_key : maskKey(key.raw_key)}
                                                </code>
                                                <button
                                                    onClick={() => toggleKeyVisibility(key.id)}
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    {visibleKeys[key.id] ? (
                                                        <EyeOff className="w-4 h-4" />
                                                    ) : (
                                                        <Eye className="w-4 h-4" />
                                                    )}
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-300">
                                                {key.label || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(key)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-300">
                                                {key.assigned_to || '-'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm text-gray-400">
                                                {key.assigned_at 
                                                    ? new Date(key.assigned_at).toLocaleDateString()
                                                    : '-'
                                                }
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {key.assigned_to && (
                                                    <button
                                                        onClick={() => handleRefreshUserKey(key.assigned_to)}
                                                        className="p-1 text-blue-400 hover:text-blue-300"
                                                        title="Refresh user key"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>
                                                )}
                                                {key.is_active && (
                                                    <button
                                                        onClick={() => handleDeactivate(key.id)}
                                                        className="p-1 text-red-400 hover:text-red-300"
                                                        title="Deactivate key"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManagedApiKeysTab;

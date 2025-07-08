'use client';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../../components/shared/ProtectedRoute';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-20">
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/20 p-8">
                            <h1 className="text-3xl font-bold text-white mb-6">Welcome to Dashboard</h1>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h2 className="text-xl font-semibold text-white mb-4">User Information</h2>                                    <div className="space-y-2">
                                        <p className="text-gray-300"><span className="font-medium">First Name:</span> {user?.firstName || 'Not provided'}</p>
                                        <p className="text-gray-300"><span className="font-medium">Last Name:</span> {user?.lastName || 'Not provided'}</p>
                                        <p className="text-gray-300"><span className="font-medium">Email:</span> {user?.email}</p>
                                        <p className="text-gray-300"><span className="font-medium">Role:</span> {user?.role || 'user'}</p>
                                        <p className="text-gray-300"><span className="font-medium">ID:</span> {user?.id}</p>
                                    </div>
                                </div>
                                
                                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                                    <h2 className="text-xl font-semibold text-white mb-4">Account Status</h2>
                                    <div className="space-y-2">
                                        <p className="text-gray-300"><span className="font-medium">Status:</span> 
                                            <span className="ml-2 px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">Active</span>
                                        </p>
                                        <p className="text-gray-300"><span className="font-medium">Member since:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
                                        <p className="text-gray-300"><span className="font-medium">Last login:</span> {user?.last_login_at ? new Date(user.last_login_at).toLocaleDateString() : 'Unknown'}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        Update Profile
                                    </button>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        Change Password
                                    </button>
                                    <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                                        View Settings
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;

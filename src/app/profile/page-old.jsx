'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ClipboardDocumentIcon,
  ArrowPathIcon 
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [apiKey, setApiKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regenerating, setRegenerating] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(null);

  const fetchApiKey = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      const response = await fetch('/api/user/api-key', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApiKey(data);
      } else {
        throw new Error('Failed to fetch API key');
      }
    } catch (error) {
      console.error('Error fetching API key:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const regenerateApiKey = async () => {
    try {
      setRegenerating(true);
      const token = await getToken();
      
      const response = await fetch('/api/user/api-key', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setApiKey(data);
        setShowKey(true); // Show the new key
      } else {
        throw new Error('Failed to regenerate API key');
      }
    } catch (error) {
      console.error('Error regenerating API key:', error);
      setError(error.message);
    } finally {
      setRegenerating(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return key.substring(0, 12) + '••••••••••••' + key.substring(key.length - 4);
  };

  useEffect(() => {
    if (!isLoaded) return;
    
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    fetchApiKey();
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-gray-400">Manage your account and API access</p>
        </div>

        {/* User Info */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <p className="text-white">{user?.fullName || user?.firstName || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <p className="text-white">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">User ID</label>
              <p className="text-white font-mono text-sm">{user?.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Member Since</label>
              <p className="text-white">{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* API Key Management */}
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <KeyIcon className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">API Key</h2>
            </div>
            <button
              onClick={regenerateApiKey}
              disabled={regenerating}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-4 py-2 rounded-lg text-white transition-colors"
            >
              <ArrowPathIcon className={`w-4 h-4 ${regenerating ? 'animate-spin' : ''}`} />
              {regenerating ? 'Regenerating...' : 'Regenerate'}
            </button>
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-4">
              <p className="text-red-200">{error}</p>
            </div>
          )}

          {loading ? (
            <div className="flex items-center gap-2 text-gray-400">
              <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
              Loading API key...
            </div>
          ) : apiKey ? (
            <div className="space-y-4">
              {/* API Key Display */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-300">Your API Key</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title={showKey ? 'Hide key' : 'Show key'}
                    >
                      {showKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(apiKey.api_key)}
                      className="text-gray-400 hover:text-white transition-colors"
                      title="Copy to clipboard"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm">
                  <span className="text-green-400">
                    {showKey ? apiKey.api_key : maskApiKey(apiKey.api_key)}
                  </span>
                </div>
                {copied && (
                  <p className="text-green-400 text-sm mt-1">✓ Copied to clipboard!</p>
                )}
              </div>

              {/* API Key Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Created:</span>
                  <span className="text-white ml-2">{new Date(apiKey.created_at).toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-gray-400">Rate Limit:</span>
                  <span className="text-white ml-2">
                    {apiKey.rate_limit?.requests_per_minute || 60}/min, {apiKey.rate_limit?.requests_per_day || 1000}/day
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Permissions:</span>
                  <span className="text-white ml-2">{apiKey.permissions?.join(', ') || 'read, write'}</span>
                </div>
                <div>
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400 ml-2">Active</span>
                </div>
              </div>

              {apiKey.note && (
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-200 text-sm">
                    <strong>Note:</strong> {apiKey.note}
                  </p>
                </div>
              )}

              {/* Usage Examples */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-white mb-3">Usage Examples</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">VS Code Extension</h4>
                    <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                      1. Open VS Code Settings<br/>
                      2. Search for "CodeMurf"<br/>
                      3. Paste your API key in the settings<br/>
                      4. Restart VS Code
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">API Request</h4>
                    <div className="bg-gray-900 rounded px-3 py-2 font-mono text-sm text-gray-300">
                      curl -H "Authorization: Bearer {showKey ? apiKey.api_key : '••••••••••••'}" \\<br/>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;https://api.codemurf.com/v1/templates
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">No API key found</p>
          )}
        </div>
      </div>
    </div>
  );
}
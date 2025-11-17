'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { 
  KeyIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ClipboardDocumentIcon,
  ArrowPathIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  GiftIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  
  const [apiKey, setApiKey] = useState(null);
  const [credits, setCredits] = useState(0.00);
  const [loading, setLoading] = useState(true);
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    
    // Load real API key from backend
    const loadApiKey = async () => {
      try {
        const token = await getToken();
        const response = await fetch('/api/user/api-key', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[Profile] API key data:', data);
          // Store the glm_api_key from backend response
          setApiKey(data.glm_api_key);
        } else {
          console.error('Failed to load API key');
        }
      } catch (error) {
        console.error('Error loading API key:', error);
      } finally {
        setCredits(0.00); // TODO: Load from user profile
        setLoading(false);
      }
    };
    
    loadApiKey();
  }, [isLoaded, isSignedIn, router, user]);

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return key.substring(0, 12) + '••••••••••••' + key.substring(key.length - 4);
  };

  const regenerateApiKey = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const response = await fetch('/api/user/api-key', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Regenerated API key:', data);
        setApiKey(data.glm_api_key);
        setCopied(false);
        setShowKey(false);
      } else {
        console.error('Failed to regenerate API key');
      }
    } catch (error) {
      console.error('Error regenerating API key:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || !isSignedIn || loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 mt-12">
        

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1">
            {/* User Profile Card */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {user?.firstName?.charAt(0) || 'C'}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user?.fullName || user?.firstName || 'Code Murf'}
                  </h2>
                  <p className="text-gray-400 text-sm">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
              </div>
            </div>

            {/* Remaining Credits */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">Remaining Credits</h3>
              <div className="text-3xl font-bold text-yellow-500">${credits.toFixed(2)}</div>
            </div>

            {/* Invite Team */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <UserGroupIcon className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">Invite Team Members</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Centralized billing. Shared models. Security you can trust.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-medium">
                Invite your team
              </button>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2">
            {/* Buy Credits */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <CreditCardIcon className="w-6 h-6 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Buy Credits</h2>
                </div>
                <span className="text-sm text-gray-400">Use crypto</span>
              </div>

              {/* Promotion Banner */}
              <div className="bg-blue-600 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <GiftIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-semibold">Get $20 Extra on Your First Top-Up</span>
                </div>
                <p className="text-blue-100 text-sm">
                  Top up any amount of credits and we'll add $20 on top of it, instantly.
                </p>
              </div>

              {/* Credit Options */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-center">
                  <div className="text-white font-semibold">Buy $10, get $30</div>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-center">
                  <div className="text-white font-semibold">Buy $20, get $40</div>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-center">
                  <div className="text-white font-semibold">Buy $100, get $120</div>
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-center">
                  <div className="text-white font-semibold">Custom</div>
                </button>
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-gray-800 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <GiftIcon className="w-5 h-5 text-green-400" />
                <h3 className="text-lg font-semibold text-white">Redeem Promotional Code</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">Enter a promotional code to add credits to your account.</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promotional code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white"
                />
                <button className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg text-white">
                  Redeem Code
                </button>
              </div>
            </div>

            {/* Integrations */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <KeyIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Integrations</h2>
              </div>

              {/* VS Code */}
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white text-sm font-bold">&lt;/&gt;</span>
                    </div>
                    <span className="text-white font-medium">Open in VS Code</span>
                  </div>
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    Reset Token and Sign Out
                  </div>
                </div>
              </div>

              {/* API Key */}
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">API Key</h3>
                <p className="text-gray-400 text-sm mb-4">
                  Use this API key in our VS Code and Jet Brains extensions, or with the Kilo Code CLI.
                </p>
                
                <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between mb-3">
                  <span className="text-green-400 font-mono text-sm">
                    {showKey && apiKey ? apiKey : (apiKey ? maskApiKey(apiKey) : 'Loading...')}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowKey(!showKey)}
                      className="text-gray-400 hover:text-white"
                    >
                      {showKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => apiKey && copyToClipboard(apiKey)}
                      className="text-gray-400 hover:text-white"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={regenerateApiKey}
                      className="text-gray-400 hover:text-white"
                      disabled={loading}
                    >
                      <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
                
                {copied && (
                  <p className="text-green-400 text-sm mb-3">✓ Copied to clipboard!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

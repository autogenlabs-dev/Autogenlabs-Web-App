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
  GiftIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  
  // Unified profile data
  const [profileData, setProfileData] = useState(null);
  const [credits, setCredits] = useState(0.00);
  const [loading, setLoading] = useState(true);
  
  // UI state
  const [showManagedKey, setShowManagedKey] = useState(false);
  const [showOpenRouterKey, setShowOpenRouterKey] = useState(false);
  const [showGLMKey, setShowGLMKey] = useState(false);
  const [copied, setCopied] = useState({ managed: false, openrouter: false, glm: false });
  const [glmKeyInput, setGlmKeyInput] = useState('');
  const [savingGLM, setSavingGLM] = useState(false);
  const [promoCode, setPromoCode] = useState('');

  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }
    
    // Load unified profile from backend (includes all API keys)
    const loadUserProfile = async () => {
      try {
        const token = await getToken();
        
        if (!token) {
          console.warn('No auth token available for profile');
          return;
        }

        // Fetch unified profile via Next.js API route
        const response = await fetch('/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          console.log('[Profile] Unified profile data:', {
            has_openrouter_key: !!data.openrouter_api_key,
            has_glm_key: !!data.glm_api_key,
            role: data.role,
            is_active: data.is_active
          });
          
          // Check if OpenRouter key is null (missing config)
          if (!data.openrouter_api_key) {
            console.warn('[Profile] OpenRouter key is null - check OPENROUTER_PROVISIONING_API_KEY in backend .env');
          }
          
          setProfileData(data);
        } else {
          console.error('Failed to load user profile');
        }
      } catch (error) {
        console.error('Error loading user profile:', error);
      } finally {
        setCredits(0.00); // TODO: Load from user profile
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [isLoaded, isSignedIn, router, getToken]);

  // Load managed key separately (not included in /api/users/me)
  useEffect(() => {
    if (profileData && isSignedIn) {
      loadManagedKey();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData?.id, isSignedIn]);

  const copyToClipboard = async (text, keyType) => {
    await navigator.clipboard.writeText(text);
    setCopied(prev => ({ ...prev, [keyType]: true }));
    setTimeout(() => setCopied(prev => ({ ...prev, [keyType]: false })), 2000);
  };

  const maskApiKey = (key) => {
    if (!key) return '';
    return key.substring(0, 12) + '••••••••••••' + key.substring(key.length - 4);
  };

  const loadManagedKey = async () => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch('http://localhost:8000/api/users/me/managed-api-key', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfileData(prev => ({ ...prev, managed_api_key: data.raw_key || data.key }));
      }
    } catch (error) {
      console.error('Error loading managed API key:', error);
    }
  };

  const refreshManagedKey = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      if (!token) {
        console.warn('No auth token available');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/users/me/managed-api-key/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Refreshed managed API key');
        setProfileData(prev => ({ ...prev, managed_api_key: data.raw_key || data.key }));
        setCopied(prev => ({ ...prev, managed: false }));
        setShowManagedKey(false);
      } else {
        const errorText = await response.text();
        console.error('Failed to refresh managed API key:', errorText);
        alert('Failed to refresh key: ' + errorText);
      }
    } catch (error) {
      console.error('Error refreshing managed API key:', error);
      alert('Error refreshing key');
    } finally {
      setLoading(false);
    }
  };

  const refreshOpenRouterKey = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      
      if (!token) {
        console.warn('No auth token available');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8000/api/users/me/openrouter-api-key/refresh', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Refreshed OpenRouter API key');
        setProfileData(prev => ({ ...prev, openrouter_api_key: data.openrouter_api_key }));
        setCopied(prev => ({ ...prev, openrouter: false }));
        setShowOpenRouterKey(false);
      } else {
        console.error('Failed to refresh OpenRouter API key');
      }
    } catch (error) {
      console.error('Error refreshing OpenRouter API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveGLMApiKey = async () => {
    if (!glmKeyInput.trim()) return;
    
    try {
      setSavingGLM(true);
      const token = await getToken();
      
      if (!token) {
        console.warn('No auth token available');
        setSavingGLM(false);
        return;
      }

      const response = await fetch(`http://localhost:8000/api/users/me/glm-api-key?api_key=${encodeURIComponent(glmKeyInput)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('[Profile] Saved GLM API key');
        setProfileData(prev => ({ ...prev, glm_api_key: data.glm_api_key }));
        setGlmKeyInput('');
      } else {
        const error = await response.text();
        console.error('Failed to save GLM API key:', error);
        alert('Failed to save GLM API key. Make sure you have a paid plan.');
      }
    } catch (error) {
      console.error('Error saving GLM API key:', error);
      alert('Error saving GLM API key');
    } finally {
      setSavingGLM(false);
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

            {/* API Keys Section */}
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <KeyIcon className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">API Keys</h2>
              </div>

              {/* Managed API Key */}
              {/* <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">Managed API Key</h3>
                  <span className="text-xs text-green-400 bg-green-400/20 px-2 py-1 rounded">Pool Managed</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  Auto-assigned from admin pool. Refresh to get a new key.
                </p>
                
                <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between mb-2">
                  <span className="text-green-400 font-mono text-sm flex-1 overflow-hidden">
                    {profileData?.managed_api_key ? (
                      showManagedKey ? profileData.managed_api_key : maskApiKey(profileData.managed_api_key)
                    ) : (
                      'Loading...'
                    )}
                  </span>
                  <div className="flex gap-2 ml-2">
                    <button
                      onClick={() => setShowManagedKey(!showManagedKey)}
                      className="text-gray-400 hover:text-white"
                      title={showManagedKey ? 'Hide' : 'Show'}
                    >
                      {showManagedKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => profileData?.managed_api_key && copyToClipboard(profileData.managed_api_key, 'managed')}
                      className="text-gray-400 hover:text-white"
                      title="Copy"
                    >
                      <ClipboardDocumentIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={refreshManagedKey}
                      className="text-gray-400 hover:text-white"
                      disabled={loading}
                      title="Refresh"
                    >
                      <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>
                {copied.managed && <p className="text-green-400 text-xs">✓ Copied!</p>}
              </div> */}

              {/* OpenRouter API Key */}
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">OpenRouter API Key</h3>
                  <span className="text-xs text-blue-400 bg-blue-400/20 px-2 py-1 rounded">Auto-Created</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  Automatically provisioned for OpenRouter integration.
                </p>
                
                {!profileData?.openrouter_api_key && profileData !== null && (
                  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-3">
                    <p className="text-yellow-400 text-xs">
                      ⚠️ OpenRouter key not available. Backend needs <code className="bg-gray-900 px-1 rounded">OPENROUTER_PROVISIONING_API_KEY</code> in .env
                    </p>
                  </div>
                )}
                
                <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between mb-2">
                  <span className="text-blue-400 font-mono text-sm flex-1 overflow-hidden">
                    {profileData?.openrouter_api_key ? (
                      showOpenRouterKey ? profileData.openrouter_api_key : maskApiKey(profileData.openrouter_api_key)
                    ) : (
                      'Not configured'
                    )}
                  </span>
                  {profileData?.openrouter_api_key && (
                    <div className="flex gap-2 ml-2">
                      <button
                        onClick={() => setShowOpenRouterKey(!showOpenRouterKey)}
                        className="text-gray-400 hover:text-white"
                        title={showOpenRouterKey ? 'Hide' : 'Show'}
                      >
                        {showOpenRouterKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(profileData.openrouter_api_key, 'openrouter')}
                        className="text-gray-400 hover:text-white"
                        title="Copy"
                      >
                        <ClipboardDocumentIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={refreshOpenRouterKey}
                        className="text-gray-400 hover:text-white"
                        disabled={loading}
                        title="Refresh"
                      >
                        <ArrowPathIcon className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                      </button>
                    </div>
                  )}
                </div>
                {copied.openrouter && <p className="text-green-400 text-xs">✓ Copied!</p>}
              </div>

              {/* GLM API Key (Paid Users Only) */}
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">GLM API Key</h3>
                  <span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">Pro/Enterprise Only</span>
                </div>
                <p className="text-gray-400 text-xs mb-3">
                  Paste your GLM API key. Requires "pro" or "enterprise" subscription plan.
                </p>
                
                {profileData?.glm_api_key ? (
                  <div>
                    <div className="bg-gray-900 rounded-lg p-3 flex items-center justify-between mb-2">
                      <span className="text-yellow-400 font-mono text-sm flex-1 overflow-hidden">
                        {showGLMKey ? profileData.glm_api_key : maskApiKey(profileData.glm_api_key)}
                      </span>
                      <div className="flex gap-2 ml-2">
                        <button
                          onClick={() => setShowGLMKey(!showGLMKey)}
                          className="text-gray-400 hover:text-white"
                          title={showGLMKey ? 'Hide' : 'Show'}
                        >
                          {showGLMKey ? <EyeSlashIcon className="w-4 h-4" /> : <EyeIcon className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(profileData.glm_api_key, 'glm')}
                          className="text-gray-400 hover:text-white"
                          title="Copy"
                        >
                          <ClipboardDocumentIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {copied.glm && <p className="text-green-400 text-xs mb-2">✓ Copied!</p>}
                    <div className="flex items-center gap-2 text-green-400 text-xs">
                      <CheckCircleIcon className="w-4 h-4" />
                      <span>GLM Key Active</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={glmKeyInput}
                      onChange={(e) => setGlmKeyInput(e.target.value)}
                      placeholder="sk-glm-..."
                      className="w-full bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white font-mono text-sm focus:outline-none focus:border-yellow-500"
                    />
                    <button
                      onClick={saveGLMApiKey}
                      disabled={savingGLM || !glmKeyInput.trim()}
                      className="w-full bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white font-medium text-sm transition-colors"
                    >
                      {savingGLM ? 'Saving...' : 'Save GLM API Key'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

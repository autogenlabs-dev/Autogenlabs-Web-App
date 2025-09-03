'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { tokenUtils } from '../../lib/api';
import { usePathname } from 'next/navigation';

const AuthDebugger = () => {
  const { user, isAuthenticated, loading, error } = useAuth();
  const pathname = usePathname();
  const [tokensInfo, setTokensInfo] = useState({});

  useEffect(() => {
    // Get token information
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();
    
    setTokensInfo({
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenExpired: accessToken ? tokenUtils.isTokenExpired(accessToken) : null,
      accessTokenPreview: accessToken ? accessToken.substring(0, 20) + '...' : null
    });
  }, [user, isAuthenticated]);

  // Only show on non-production and when there are issues
  if (process.env.NODE_ENV === 'production') return null;

  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-white p-4 rounded-lg max-w-sm text-xs z-50 border border-gray-600">
      <div className="font-bold text-green-400 mb-2">🔍 Auth Debug Info</div>
      
      <div className="space-y-1">
        <div>📍 <strong>Current Path:</strong> {pathname}</div>
        <div>🔐 <strong>Is Authenticated:</strong> {isAuthenticated ? '✅ YES' : '❌ NO'}</div>
        <div>⏳ <strong>Loading:</strong> {loading ? '⏳ YES' : '✅ NO'}</div>
        <div>👤 <strong>User:</strong> {user ? `${user.name} (${user.email})` : '❌ NULL'}</div>
        <div>❌ <strong>Error:</strong> {error || '✅ NONE'}</div>
        
        <hr className="border-gray-600 my-2" />
        
        <div>🎫 <strong>Access Token:</strong> {tokensInfo.hasAccessToken ? '✅' : '❌'}</div>
        <div>🔄 <strong>Refresh Token:</strong> {tokensInfo.hasRefreshToken ? '✅' : '❌'}</div>
        {tokensInfo.hasAccessToken && (
          <div>⏰ <strong>Token Expired:</strong> {tokensInfo.accessTokenExpired ? '❌ YES' : '✅ NO'}</div>
        )}
        {tokensInfo.accessTokenPreview && (
          <div>👁️ <strong>Token Preview:</strong> {tokensInfo.accessTokenPreview}</div>
        )}
      </div>
      
      <button 
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="mt-2 bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
      >
        Clear & Reload
      </button>
    </div>
  );
};

export default AuthDebugger;


/**
 * Unified Authentication Helper for Backend API Calls
 * Handles Clerk token authentication for all backend requests
 */

import { getAuth } from '@clerk/nextjs/server';

// Base URL for backend API (defaults to localhost for dev)
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Client-side fetch with Clerk authentication
 * Use this in React components/client code
 */
export async function fetchWithAuth(path, init = {}) {
  // Dynamic import to avoid SSR issues
  const { getToken } = await import('@clerk/nextjs');
  const token = await getToken();
  
  if (!token) {
    throw new Error('Missing Clerk token - user not authenticated');
  }

  const url = path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
  
  const res = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Server-side fetch with Clerk authentication
 * Use this in Next.js Route Handlers (app/api/*)
 */
export async function fetchWithAuthServer(req, path, init = {}) {
  const { getToken } = getAuth(req);
  const token = await getToken();
  
  if (!token) {
    throw new Error('Missing Clerk token - user not authenticated');
  }

  const url = path.startsWith('http') ? path : `${BACKEND_URL}${path}`;
  
  const res = await fetch(url, {
    ...init,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

/**
 * Verify user with backend
 * Client-side helper that posts Clerk token to backend for verification
 */
export async function verifyUserWithClerk() {
  const { getToken } = await import('@clerk/nextjs');
  const token = await getToken();
  
  if (!token) {
    throw new Error('Not authenticated');
  }

  // Post to Next.js API route which proxies to backend
  const res = await fetch('/api/verify-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    throw new Error('User verification failed');
  }

  return res.json();
}

/**
 * Get unified user profile
 * Fetches all user data including managed_api_key, openrouter_api_key, glm_api_key
 */
export async function getUserProfile() {
  return fetchWithAuth('/api/users/me');
}

/**
 * Update user's GLM API key (paid users only)
 */
export async function updateGLMApiKey(apiKey) {
  return fetchWithAuth(`/api/users/me/glm-api-key?api_key=${encodeURIComponent(apiKey)}`, {
    method: 'POST',
  });
}

/**
 * Refresh managed API key
 * Releases current key and assigns a new one from the pool
 */
export async function refreshManagedApiKey() {
  return fetchWithAuth('/api/users/me/managed-api-key/refresh', {
    method: 'POST',
  });
}

/**
 * Refresh OpenRouter API key
 * Generates a new OpenRouter key for the user
 */
export async function refreshOpenRouterApiKey() {
  return fetchWithAuth('/api/users/me/openrouter-api-key/refresh', {
    method: 'POST',
  });
}

export { BACKEND_URL };

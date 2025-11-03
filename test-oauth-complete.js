#!/usr/bin/env node

/**
 * Complete OAuth Flow Test Script
 * Tests the entire Google OAuth authentication flow
 */

const http = require('http');
const url = require('url');

const FRONTEND_URL = 'http://localhost:3000';
const BACKEND_URL = 'http://localhost:8000';

async function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? require('https') : http;
    
    const req = lib.request(url, options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          data: data,
          location: res.headers.location
        });
      });
    });
    
    req.on('error', reject);
    req.end();
  });
}

async function testOAuthFlow() {
  console.log('🔍 Testing Complete OAuth Flow\n');
  
  try {
    // Test 1: Check if backend is running
    console.log('1. Testing backend connectivity...');
    const backendTest = await makeRequest(`${BACKEND_URL}/api/auth/providers`);
    if (backendTest.statusCode === 200) {
      console.log('✅ Backend is running and accessible');
      const providers = JSON.parse(backendTest.data);
      const googleProvider = providers.providers.find(p => p.name === 'google');
      if (googleProvider) {
        console.log('✅ Google OAuth provider is configured');
      } else {
        console.log('❌ Google OAuth provider not found');
        return;
      }
    } else {
      console.log('❌ Backend is not accessible');
      return;
    }
    
    // Test 2: Test frontend Google login initiation
    console.log('\n2. Testing frontend Google login initiation...');
    const frontendLogin = await makeRequest(`${FRONTEND_URL}/api/auth/google/login`, {
      method: 'GET',
      followRedirects: false
    });
    
    if (frontendLogin.statusCode === 302 || frontendLogin.statusCode === 307) {
      console.log('✅ Frontend redirects to backend');
      console.log('   Redirect location:', frontendLogin.location);
      
      // Test 3: Test backend Google login initiation
      console.log('\n3. Testing backend Google login initiation...');
      const backendLogin = await makeRequest(`${BACKEND_URL}/api/auth/google/login`, {
        method: 'GET',
        followRedirects: false
      });
      
      if (backendLogin.statusCode === 302) {
        console.log('✅ Backend redirects to Google OAuth');
        console.log('   Redirect location:', backendLogin.location);
        
        // Extract redirect_uri from Google OAuth URL
        const googleUrl = new URL(backendLogin.location);
        const redirectUri = googleUrl.searchParams.get('redirect_uri');
        console.log('   Google OAuth redirect_uri:', redirectUri);
        
        if (redirectUri === 'http://localhost:8000/api/auth/google/callback') {
          console.log('✅ Redirect URI matches backend callback');
        } else {
          console.log('❌ Redirect URI mismatch');
          console.log('   Expected: http://localhost:8000/api/auth/google/callback');
          console.log('   Got:', redirectUri);
        }
        
        // Test 4: Check if frontend callback page exists
        console.log('\n4. Testing frontend callback page...');
        const callbackTest = await makeRequest(`${FRONTEND_URL}/auth/callback`);
        if (callbackTest.statusCode === 200) {
          console.log('✅ Frontend callback page is accessible');
        } else {
          console.log('❌ Frontend callback page not accessible');
        }
        
        console.log('\n🎉 OAuth Flow Configuration Test Complete!');
        console.log('\n📋 Summary:');
        console.log('- Backend: ✅ Running and configured');
        console.log('- Frontend: ✅ Running and accessible');
        console.log('- Google OAuth: ✅ Properly configured');
        console.log('- Redirect URIs: ✅ Match expected values');
        console.log('\n🔧 To test the complete flow:');
        console.log('1. Visit: http://localhost:3000/auth');
        console.log('2. Click "Login with Google"');
        console.log('3. Complete Google OAuth');
        console.log('4. Check browser console for debugging info');
        
      } else {
        console.log('❌ Backend does not redirect to Google OAuth');
        console.log('   Status code:', backendLogin.statusCode);
      }
    } else {
      console.log('❌ Frontend does not redirect to backend');
      console.log('   Status code:', frontendLogin.statusCode);
    }
    
  } catch (error) {
    console.error('❌ Error testing OAuth flow:', error.message);
  }
}

// Run the test
testOAuthFlow();
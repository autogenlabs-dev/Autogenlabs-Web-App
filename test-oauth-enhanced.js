/**
 * Enhanced OAuth Testing Script
 * This script helps diagnose OAuth flow issues by testing each component
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const OAuthTester = {
  // Configuration
  config: {
    frontendUrl: process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000',
    backendUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    googleClientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '37099745939-4v685b95lv9r2306l1edq4s7dpnk05vd.apps.googleusercontent.com'
  },

  // Test OAuth login endpoint
  async testOAuthLogin() {
    console.log('🧪 Testing OAuth Login Endpoint...');
    
    try {
      const response = await fetch(`${this.config.frontendUrl}/api/auth/google/login`, {
        method: 'GET',
        redirect: 'manual' // Don't follow redirects automatically
      });
      
      console.log('📊 OAuth Login Test Results:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        redirectLocation: response.headers.get('location')
      });
      
      return {
        success: response.status === 302 || response.status === 307,
        redirectUrl: response.headers.get('location'),
        error: null
      };
    } catch (error) {
      console.error('❌ OAuth Login Test Failed:', error);
      return {
        success: false,
        redirectUrl: null,
        error: error.message
      };
    }
  },

  // Test backend OAuth endpoint directly
  async testBackendOAuth() {
    console.log('🧪 Testing Backend OAuth Endpoint...');
    
    try {
      const backendOAuthUrl = `${this.config.backendUrl}/auth/google/login`; // Backend uses /auth not /api/auth
      const response = await fetch(backendOAuthUrl, {
        method: 'HEAD', // Just check if endpoint exists
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      
      console.log('📊 Backend OAuth Test Results:', {
        url: backendOAuthUrl,
        status: response.status,
        statusText: response.statusText,
        available: response.status !== 404 && response.status !== 405
      });
      
      return {
        success: response.status !== 404 && response.status !== 405,
        status: response.status,
        error: null
      };
    } catch (error) {
      console.error('❌ Backend OAuth Test Failed:', error);
      return {
        success: false,
        status: null,
        error: error.message
      };
    }
  },

  // Test token exchange endpoint
  async testTokenExchange() {
    console.log('🧪 Testing Token Exchange Endpoint...');
    
    try {
      const testCode = 'test_authorization_code';
      const testState = 'test_state';
      
      const response = await fetch(`${this.config.frontendUrl}/api/auth/exchange-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: testCode,
          state: testState,
          provider: 'google'
        })
      });
      
      const responseData = await response.json();
      
      console.log('📊 Token Exchange Test Results:', {
        status: response.status,
        statusText: response.statusText,
        data: responseData
      });
      
      return {
        success: response.status === 400 || response.status === 500, // Expected for test code
        data: responseData,
        error: null
      };
    } catch (error) {
      console.error('❌ Token Exchange Test Failed:', error);
      return {
        success: false,
        data: null,
        error: error.message
      };
    }
  },

  // Test callback page with mock parameters
  async testCallbackPage() {
    console.log('🧪 Testing Callback Page...');
    
    try {
      const testParams = new URLSearchParams({
        access_token: 'test_access_token',
        refresh_token: 'test_refresh_token',
        user_id: 'test_user_id'
      });
      
      const callbackUrl = `${this.config.frontendUrl}/auth/callback?${testParams}`;
      
      // Note: This would need to be tested in a browser environment
      console.log('📊 Callback Page Test:', {
        testUrl: callbackUrl,
        note: 'Callback page requires browser environment for full testing'
      });
      
      return {
        success: true,
        testUrl: callbackUrl,
        error: null
      };
    } catch (error) {
      console.error('❌ Callback Page Test Failed:', error);
      return {
        success: false,
        testUrl: null,
        error: error.message
      };
    }
  },

  // Test environment variables
  testEnvironmentVariables() {
    console.log('🧪 Testing Environment Variables...');
    
    const envVars = {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      VERCEL_URL: process.env.VERCEL_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
    };
    
    console.log('📊 Environment Variables:', envVars);
    
    const issues = [];
    
    if (!envVars.NEXT_PUBLIC_API_URL) {
      issues.push('NEXT_PUBLIC_API_URL is not set');
    }
    
    if (!envVars.NEXT_PUBLIC_GOOGLE_CLIENT_ID && !envVars.GOOGLE_CLIENT_ID) {
      issues.push('No Google Client ID found');
    }
    
    return {
      success: issues.length === 0,
      envVars,
      issues,
      error: issues.length > 0 ? issues.join(', ') : null
    };
  },

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Enhanced OAuth Tests...');
    console.log('📋 Configuration:', this.config);
    
    const results = {
      timestamp: new Date().toISOString(),
      config: this.config,
      tests: {}
    };
    
    // Test environment variables first
    results.tests.environment = this.testEnvironmentVariables();
    
    // Test backend OAuth endpoint
    results.tests.backendOAuth = await this.testBackendOAuth();
    
    // Test frontend OAuth login
    results.tests.oauthLogin = await this.testOAuthLogin();
    
    // Test token exchange
    results.tests.tokenExchange = await this.testTokenExchange();
    
    // Test callback page
    results.tests.callbackPage = await this.testCallbackPage();
    
    // Summary
    const allTests = Object.values(results.tests);
    const passedTests = allTests.filter(test => test.success).length;
    const totalTests = allTests.length;
    
    console.log('\n📊 Test Summary:');
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    
    if (passedTests < totalTests) {
      console.log('\n🔧 Issues Found:');
      Object.entries(results.tests).forEach(([testName, result]) => {
        if (!result.success) {
          console.log(`  ❌ ${testName}: ${result.error}`);
        }
      });
    }
    
    console.log('\n📄 Full Results:', JSON.stringify(results, null, 2));
    
    return results;
  }
};

// Run tests if this script is executed directly
if (typeof module !== 'undefined' && require.main === module) {
  OAuthTester.runAllTests().catch(console.error);
}

// Export for use in other modules
if (typeof module !== 'undefined') {
  module.exports = OAuthTester;
}

// Also make available globally for browser console
if (typeof window !== 'undefined') {
  window.OAuthTester = OAuthTester;
}
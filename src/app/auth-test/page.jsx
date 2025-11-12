/**
 * Authentication Test Script
 * Tests Clerk authentication integration
 */

'use client';

import { useAuth } from '@clerk/nextjs';
import { adminApi } from '../../lib/adminApi';
import { componentApi } from '../../lib/componentApi';
import { templateApi } from '../../lib/apiTemplates';
import { developerApi } from '../../lib/developerApi';
import { paymentApi } from '../../lib/paymentApi';
import { marketplaceApi } from '../../lib/marketplaceApi';

export default function AuthTest() {
  const { user, getToken } = useAuth();

  const testApiCalls = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('No token available - user not authenticated');
        return;
      }

      console.log('Testing API calls with token...');

      // Test adminApi
      try {
        const users = await adminApi.getUsers({}, token);
        console.log('adminApi.getUsers success:', users);
      } catch (error) {
        console.log('adminApi.getUsers error:', error.message);
      }

      // Test componentApi
      try {
        const components = await componentApi.getComponents({}, token);
        console.log('componentApi.getComponents success:', components);
      } catch (error) {
        console.log('componentApi.getComponents error:', error.message);
      }

      // Test apiTemplates
      try {
        const templates = await templateApi.getTemplates({}, token);
        console.log('templateApi.getTemplates success:', templates);
      } catch (error) {
        console.log('templateApi.getTemplates error:', error.message);
      }

      // Test developerApi
      try {
        const developerData = await developerApi.getDeveloperData(token);
        console.log('developerApi.getDeveloperData success:', developerData);
      } catch (error) {
        console.log('developerApi.getDeveloperData error:', error.message);
      }

      // Test paymentApi
      try {
        const payments = await paymentApi.getPayments({}, token);
        console.log('paymentApi.getPayments success:', payments);
      } catch (error) {
        console.log('paymentApi.getPayments error:', error.message);
      }

      // Test marketplaceApi
      try {
        const marketplaceItems = await marketplaceApi.getMarketplaceItems({}, token);
        console.log('marketplaceApi.getMarketplaceItems success:', marketplaceItems);
      } catch (error) {
        console.log('marketplaceApi.getMarketplaceItems error:', error.message);
      }

    } catch (error) {
      console.error('Test failed:', error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Test</h1>

      {user ? (
        <div>
          <p className="mb-4">Welcome, {user.firstName}! You are authenticated.</p>
          <button
            onClick={testApiCalls}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Test API Calls
          </button>
        </div>
      ) : (
        <p>Please sign in to test the API calls.</p>
      )}
    </div>
  );
}
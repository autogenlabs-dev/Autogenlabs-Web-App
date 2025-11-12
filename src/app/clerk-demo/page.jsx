'use client';

import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  SignedIn,
  SignedOut,
  useUser,
} from '@clerk/nextjs';
import Link from 'next/link';

export default function ClerkDemoPage() {
  const { user, isLoaded } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Clerk Authentication Demo
          </h1>
          <p className="text-lg text-gray-600">
            This page demonstrates all Clerk components and features
          </p>
        </div>

        {/* Authentication Status Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Current Authentication Status
          </h2>
          
          {!isLoaded ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {/* Signed Out State */}
              <SignedOut>
                <div className="space-y-6">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          You are currently signed out
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <SignInButton mode="modal">
                      <button className="flex-1 bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
                        Sign In (Modal)
                      </button>
                    </SignInButton>
                    
                    <SignUpButton mode="modal">
                      <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                        Sign Up (Modal)
                      </button>
                    </SignUpButton>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-3">Or use dedicated pages:</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Link href="/sign-in" className="flex-1 text-center bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors">
                        Sign In Page
                      </Link>
                      <Link href="/sign-up" className="flex-1 text-center bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-500 transition-colors">
                        Sign Up Page
                      </Link>
                    </div>
                  </div>
                </div>
              </SignedOut>

              {/* Signed In State */}
              <SignedIn>
                <div className="space-y-6">
                  <div className="bg-green-50 border-l-4 border-green-400 p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          You are successfully authenticated!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* User Info Display */}
                  {user && (
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-800">User Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                          <img
                            src={user.imageUrl}
                            alt={user.fullName || 'User'}
                            className="w-16 h-16 rounded-full border-2 border-gray-300"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{user.fullName || 'No name set'}</p>
                            <p className="text-sm text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
                            <p className="text-xs text-gray-500 mt-1">ID: {user.id}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* User Button Demo */}
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">Clerk UserButton Component</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Click on your avatar to access user management options:
                    </p>
                    <div className="flex items-center space-x-4">
                      <UserButton
                        appearance={{
                          elements: {
                            avatarBox: "w-12 h-12",
                          },
                        }}
                        afterSignOutUrl="/"
                        showName={true}
                      />
                      <span className="text-sm text-gray-500">← Click to manage your account</span>
                    </div>
                  </div>

                  {/* Sign Out Button */}
                  <div className="pt-4 border-t border-gray-200">
                    <SignOutButton>
                      <button className="w-full bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              </SignedIn>
            </>
          )}
        </div>

        {/* Integration Code Examples */}
        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Quick Integration Examples
          </h2>
          
          <div className="space-y-6">
            {/* Example 1 */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">1. Basic Sign In/Out Buttons</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { SignInButton, SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs';

<SignedOut>
  <SignInButton />
</SignedOut>
<SignedIn>
  <SignOutButton />
</SignedIn>`}
              </pre>
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">2. User Button with Avatar</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { UserButton } from '@clerk/nextjs';

<UserButton afterSignOutUrl="/" />`}
              </pre>
            </div>

            {/* Example 3 */}
            <div>
              <h3 className="text-lg font-medium mb-2 text-gray-700">3. Access User Data</h3>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useUser } from '@clerk/nextjs';

const { user, isLoaded } = useUser();

if (!isLoaded) return <div>Loading...</div>;
if (!user) return <div>Not signed in</div>;

return <div>Hello, {user.firstName}!</div>;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Documentation Links */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Useful Resources
          </h2>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://clerk.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <span className="font-medium text-gray-700">Clerk Documentation</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a
              href="https://clerk.com/docs/quickstarts/nextjs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <span className="font-medium text-gray-700">Next.js Quickstart</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <a
              href="https://dashboard.clerk.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <span className="font-medium text-gray-700">Clerk Dashboard</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
            
            <Link
              href="/dashboard"
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors"
            >
              <span className="font-medium text-gray-700">Go to Dashboard</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

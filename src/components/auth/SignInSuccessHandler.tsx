'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

/**
 * Component that handles automatic redirect to VS Code after successful authentication
 * When user signs in from VS Code extension (with ?source=vscode parameter),
 * this component generates a JWT token and redirects back to VS Code
 */
export function SignInSuccessHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const source = searchParams.get('source')
    
    // Only proceed if user signed in and source is vscode
    if (!isLoaded || processing) return
    if (!isSignedIn) return
    if (source !== 'vscode') return

    const handleVSCodeRedirect = async () => {
      setProcessing(true)
      setError(null)

      try {
        // Call API to generate JWT and get deep link
        const response = await fetch('/api/extension-auth')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate auth token')
        }

        // Redirect to VS Code with deep link
        console.log('✅ Redirecting to VS Code:', data.deepLink)
        window.location.href = data.deepLink

        // Show success message and redirect to dashboard after 2 seconds
        setTimeout(() => {
          router.push('/dashboard')
        }, 2000)
      } catch (err) {
        console.error('❌ Error redirecting to VS Code:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProcessing(false)
      }
    }

    handleVSCodeRedirect()
  }, [isSignedIn, isLoaded, searchParams, processing, router])

  // Don't render anything if not from VS Code
  const source = searchParams.get('source')
  if (source !== 'vscode' || !isSignedIn) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          {processing && !error && (
            <>
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900">Connecting to VS Code...</h2>
              <p className="text-gray-600 text-center">
                Please allow the browser to open VS Code when prompted.
              </p>
              <p className="text-sm text-gray-500 text-center">
                If nothing happens, check your browser&apos;s popup blocker.
              </p>
            </>
          )}
          
          {error && (
            <>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-600">Connection Failed</h2>
              <p className="text-gray-600 text-center">{error}</p>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Go to Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

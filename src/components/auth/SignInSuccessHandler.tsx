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
  const [deepLink, setDeepLink] = useState<string | null>(null)
  const [showOpenButton, setShowOpenButton] = useState(false)

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

        console.log('✅ VS Code deep link ready:', data.deepLink)
        setDeepLink(data.deepLink)
        
        // Try automatic redirect first
        try {
          window.location.href = data.deepLink
          
          // After 2 seconds, show manual button if still on page
          setTimeout(() => {
            setShowOpenButton(true)
            setProcessing(false)
          }, 2000)
        } catch (err) {
          // If automatic redirect fails, show button immediately
          console.log('Automatic redirect failed, showing manual button')
          setShowOpenButton(true)
          setProcessing(false)
        }
      } catch (err) {
        console.error('❌ Error generating auth token:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
        setProcessing(false)
      }
    }

    handleVSCodeRedirect()
  }, [isSignedIn, isLoaded, searchParams, processing, router])

  const handleOpenVSCode = () => {
    if (deepLink) {
      // Create a temporary link and click it
      const link = document.createElement('a')
      link.href = deepLink
      link.target = '_blank'
      link.rel = 'noopener noreferrer'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      // Redirect to dashboard after opening VS Code
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    }
  }

  // Don't render anything if not from VS Code
  const source = searchParams.get('source')
  if (source !== 'vscode' || !isSignedIn) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md mx-4 shadow-xl">
        <div className="flex flex-col items-center gap-4">
          {processing && !showOpenButton && !error && (
            <>
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <h2 className="text-xl font-semibold text-gray-900">Connecting to VS Code...</h2>
              <p className="text-gray-600 text-center">
                Generating authentication token...
              </p>
            </>
          )}

          {showOpenButton && !error && (
            <>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Ready to Open VS Code!</h2>
              <p className="text-gray-600 text-center">
                Click the button below to open VS Code and complete authentication.
              </p>
              <button
                onClick={handleOpenVSCode}
                className="mt-2 px-8 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 active:scale-95 transition-all shadow-lg flex items-center gap-3"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/>
                </svg>
                Open VS Code Extension
              </button>
              <button
                onClick={() => router.push('/dashboard')}
                className="mt-2 text-sm text-gray-500 hover:text-gray-700 underline"
              >
                Skip and go to dashboard
              </button>
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

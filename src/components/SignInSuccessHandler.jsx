'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'

export function SignInSuccessHandler() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { isSignedIn, isLoaded } = useAuth()
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState(null)

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
        console.log('🔄 Redirecting to VS Code...')
        
        // Call API to generate JWT and get deep link
        const response = await fetch('/api/extension-auth')
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to generate auth token')
        }

        console.log('✅ Deep link received:', data.deepLink)
        
        // Redirect to VS Code with deep link
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
  if (source !== 'vscode') return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md">
        {processing && !error && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-center mb-2">
              Connecting to VS Code...
            </h3>
            <p className="text-gray-600 text-center">
              Please allow the browser to open VS Code when prompted.
            </p>
          </>
        )}
        
        {error && (
          <>
            <div className="text-red-500 text-4xl text-center mb-4">❌</div>
            <h3 className="text-xl font-semibold text-center mb-2 text-red-600">
              Connection Failed
            </h3>
            <p className="text-gray-600 text-center mb-4">{error}</p>
            <button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Go to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}

import { useAuth } from '@clerk/nextjs'
import { useState, useEffect } from 'react'

export function useApiKeys() {
  const { getToken, isLoaded, isSignedIn } = useAuth()
  const [apiKeys, setApiKeys] = useState([])
  const [glmApiKey, setGlmApiKey] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchApiKeys() {
      if (!isLoaded || !isSignedIn) {
        setLoading(false)
        return
      }

      try {
        console.log('[useApiKeys] Fetching API keys...')
        
        // Get Clerk token
        const token = await getToken()
        console.log('[useApiKeys] Token obtained:', !!token)

        if (!token) {
          throw new Error('No authentication token')
        }

        // Call the API endpoint with Authorization header
        const response = await fetch('/api/user/api-key', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })

        console.log('[useApiKeys] Response status:', response.status)

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch API keys')
        }

        const data = await response.json()
        console.log('[useApiKeys] API keys retrieved:', data.api_keys?.length || 0)
        console.log('[useApiKeys] GLM API key present:', !!data.glm_api_key)
        
        setApiKeys(data.api_keys || [])
        setGlmApiKey(data.glm_api_key || null)
        setError(null)
      } catch (err) {
        console.error('[useApiKeys] Error:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchApiKeys()
  }, [isLoaded, isSignedIn, getToken])

  return { apiKeys, glmApiKey, loading, error }
}

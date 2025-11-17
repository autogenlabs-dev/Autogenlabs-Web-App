"use client"

import { useEffect } from 'react'
import { useAuth } from '@clerk/nextjs'

export default function VerifyOnLoad() {
  const { isLoaded, isSignedIn, getToken } = useAuth()

  useEffect(() => {
    if (!isLoaded) return
    if (!isSignedIn) return

    const verify = async () => {
      try {
        console.log('[VerifyOnLoad] Calling verify-user endpoint...')
        
        const token = await getToken()
        if (!token) {
          console.warn('[VerifyOnLoad] No token available')
          return
        }

        console.log('[VerifyOnLoad] Token obtained, calling backend')
        
        const res = await fetch('/api/verify-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        })

        const data = await res.json()
        console.log('[VerifyOnLoad] Backend response:', res.status, data)
        
        if (!res.ok) {
          console.error('[VerifyOnLoad] Verification failed:', res.status, data)
        } else {
          console.log('[VerifyOnLoad] ✅ Verification successful')
        }
      } catch (err) {
        console.error('[VerifyOnLoad] Error:', err)
      }
    }

    verify()
  }, [isLoaded, isSignedIn, getToken])

  return null
}

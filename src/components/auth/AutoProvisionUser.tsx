'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

/**
 * Auto-provision component
 * Automatically provisions GLM API key for new users
 * Add this to your dashboard or layout
 */
export default function AutoProvisionUser() {
  const { user, isLoaded } = useUser();
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isProvisioned, setIsProvisioned] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user || isProvisioning || isProvisioned) return;

    // Check if user already has API key
    const hasApiKey = user.publicMetadata?.glmApiKey;

    if (hasApiKey) {
      setIsProvisioned(true);
      return;
    }

    // Provision user with API key
    const provisionUser = async () => {
      setIsProvisioning(true);

      try {
        const response = await fetch('/api/auth/provision-user', {
          method: 'POST',
        });

        if (response.ok) {
          const data = await response.json();
          console.log('✅ User provisioned with GLM API key');
          setIsProvisioned(true);

          // Reload user to get updated metadata
          await user.reload();
        } else {
          console.error('Failed to provision user');
        }
      } catch (error) {
        console.error('Error provisioning user:', error);
      } finally {
        setIsProvisioning(false);
      }
    };

    provisionUser();
  }, [user, isLoaded, isProvisioning, isProvisioned]);

  // This component doesn't render anything
  return null;
}

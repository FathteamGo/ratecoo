'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/auth';

export function useAuth() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchSession() {
      try {
        const session = await auth();
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error fetching session:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    
    fetchSession();
  }, []);
  
  return { user, loading };
}
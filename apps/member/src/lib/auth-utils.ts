import { auth } from '@/auth';
import { redirect } from 'next/navigation';

/**
 * Checks if the user is authenticated and redirects to login if not
 */
export async function requireAuth() {
  const session = await auth();
  if (!session) redirect('/auth/signin');
  return session;
}
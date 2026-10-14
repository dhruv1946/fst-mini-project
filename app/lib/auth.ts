import { cookies } from 'next/headers';
import { DatabaseService } from './db';
import { UserData } from './seed-data';

export interface AuthSession {
  user: UserData | null;
  token?: string;
  role: 'STUDENT' | 'MODERATOR' | 'ADMIN' | 'GUEST';
  isVerified: boolean;
  expiresAt?: string;
}

/**
 * Better Auth & Academic Security Helper
 * Validates approved academic domains (e.g. .edu, .ac.in, university portals)
 */
export function isAuthorizedStudentEmail(email: string): boolean {
  if (!email || !email.includes('@')) return false;
  const domain = email.split('@')[1]?.toLowerCase() || '';
  const allowedPatterns = [
    '.edu',
    '.ac.in',
    '.edu.in',
    '.ac.uk',
    'campus.edu',
    'university.edu',
    'student.ac.in',
  ];
  return allowedPatterns.some((pattern) => domain.endsWith(pattern) || domain.includes(pattern));
}

/**
 * Returns current authenticated session user from cookieStore
 * Returns null if the user has explicitly logged out (session_user_id === 'guest')
 * Defaults to primary administrator for initial landing
 */
export async function getCurrentUser(userIdOverride?: string): Promise<UserData | null> {
  const users = await DatabaseService.getUsers();
  if (userIdOverride) {
    const matched = users.find((u) => u.id === userIdOverride);
    if (matched) return matched;
  }

  try {
    const cookieStore = await cookies();
    const sessionUserId = cookieStore.get('session_user_id')?.value;
    if (sessionUserId === 'guest') {
      return null;
    }
    if (sessionUserId) {
      const user = users.find((u) => u.id === sessionUserId);
      if (user) return user;
    }
  } catch {
    // If called outside of a request context, fallback to default user
  }

  return users[0];
}

export async function getSession(userIdOverride?: string): Promise<AuthSession> {
  const user = await getCurrentUser(userIdOverride);
  if (!user) {
    return {
      user: null,
      role: 'GUEST',
      isVerified: false,
    };
  }
  return {
    user,
    token: `sess_jwt_${user.id}_${Date.now()}`,
    role: user.role,
    isVerified: user.isVerifiedStudent,
    expiresAt: new Date(Date.now() + 86400 * 1000).toISOString(),
  };
}

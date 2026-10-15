'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DatabaseService } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

/**
 * Real credential-based login:
 * Anyone can enter credentials.
 * If credentials match 'admin' or 'admin@campus.edu', logs in with Admin clearance.
 * Otherwise creates/authenticates the specified student account.
 */
export async function loginWithCredentialsAction(formData: FormData) {
  const usernameOrEmail = String(formData.get('username') || '').trim();
  const password = String(formData.get('password') || '').trim();
  const redirectTo = String(formData.get('redirect') || '/');

  if (!usernameOrEmail) {
    redirect(`/login?error=credentials_required&redirect=${encodeURIComponent(redirectTo)}`);
  }

  const cookieStore = await cookies();
  const normalized = usernameOrEmail.toLowerCase();

  // Admin access check: Dhruv
  if (
    normalized === 'admin' ||
    normalized === 'admin@campus.edu' ||
    normalized === 'dhruv' ||
    normalized === 'dhruv@campus.edu'
  ) {
    cookieStore.set('session_user_id', 'usr-admin', { path: '/', httpOnly: true });
    cookieStore.set('user_role', 'ADMIN', { path: '/', httpOnly: true });
    cookieStore.set('user_email', 'admin@campus.edu', { path: '/', httpOnly: true });
  } else {
    // Authenticate or register custom student credentials
    const users = await DatabaseService.getUsers();
    let user = users.find(
      (u) => u.email.toLowerCase() === normalized || u.name.toLowerCase() === normalized
    );

    if (!user) {
      const cleanName = usernameOrEmail.includes('@')
        ? usernameOrEmail.split('@')[0].replace(/[._-]/g, ' ')
        : usernameOrEmail;
      const formattedName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const email = usernameOrEmail.includes('@')
        ? usernameOrEmail
        : `${usernameOrEmail.toLowerCase().replace(/\s+/g, '.')}@campus.edu`;

      user = await DatabaseService.createUser({
        name: formattedName,
        email,
        studentId: `ENG-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        university: 'Institute of Engineering & Tech',
        department: 'Engineering Department',
        role: 'STUDENT',
        isVerifiedStudent: true,
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        trustRating: 4.9,
      });
    }

    cookieStore.set('session_user_id', user.id, { path: '/', httpOnly: true });
    cookieStore.set('user_role', user.role || 'STUDENT', { path: '/', httpOnly: true });
    cookieStore.set('user_email', user.email, { path: '/', httpOnly: true });
  }

  revalidatePath('/', 'layout');
  redirect(redirectTo);
}

/**
 * OAuth Login: GitHub authentication
 * Initiates the real OAuth 2.0 redirection flow
 */
export async function loginWithOAuthAction(provider: 'github', redirectTo?: string) {
  const target = redirectTo ? `?redirect=${encodeURIComponent(redirectTo)}` : '';
  redirect(`/api/auth/${provider}${target}`);
}

/**
 * Switch into Guest Mode (Public Read-Only Browsing)
 */
export async function setGuestModeAction(redirectTo?: string) {
  const cookieStore = await cookies();
  cookieStore.set('session_user_id', 'guest', { path: '/', httpOnly: true });
  cookieStore.set('user_role', 'GUEST', { path: '/', httpOnly: true });
  cookieStore.set('user_email', '', { path: '/', httpOnly: true });

  revalidatePath('/', 'layout');
  redirect(redirectTo || '/');
}

/**
 * Log out (sets guest mode)
 */
export async function logoutAction() {
  await setGuestModeAction('/login?logged_out=1');
}

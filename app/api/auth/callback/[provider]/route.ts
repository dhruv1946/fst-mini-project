import { NextRequest, NextResponse } from 'next/server';
import { DatabaseService } from '@/app/lib/db';
import { cookies } from 'next/headers';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const stateRaw = searchParams.get('state');

  let redirectTarget = '/';
  if (stateRaw) {
    try {
      const parsed = JSON.parse(Buffer.from(stateRaw, 'base64').toString('utf-8'));
      if (parsed.redirect) redirectTarget = parsed.redirect;
    } catch {
      // fallback
    }
  }

  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;
  const callbackUrl = `${baseUrl}/api/auth/callback/${provider}`;

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=oauth_denied', baseUrl));
  }

  try {
    let email = '';
    let name = '';
    let avatarUrl = '';

    if (provider === 'google') {
      const clientId = process.env.GOOGLE_CLIENT_ID || '';
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';

      const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          code,
          client_id: clientId,
          client_secret: clientSecret,
          redirect_uri: callbackUrl,
          grant_type: 'authorization_code',
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        console.error('Google OAuth token error:', tokenData);
        return NextResponse.redirect(new URL('/login?error=oauth_token_failed', baseUrl));
      }

      const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });
      const userData = await userRes.json();

      email = userData.email;
      name = userData.name || userData.email.split('@')[0];
      avatarUrl = userData.picture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150';
    } else if (provider === 'github') {
      const clientId = process.env.GITHUB_CLIENT_ID || '';
      const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          redirect_uri: callbackUrl,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenData.access_token) {
        console.error('GitHub OAuth token error:', tokenData);
        return NextResponse.redirect(new URL('/login?error=oauth_token_failed', baseUrl));
      }

      const userRes = await fetch('https://api.github.com/user', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          'User-Agent': 'Campus-Hardware-Exchange',
        },
      });
      const userData = await userRes.json();

      name = userData.name || userData.login;
      avatarUrl = userData.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150';

      if (userData.email) {
        email = userData.email;
      } else {
        const emailsRes = await fetch('https://api.github.com/user/emails', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'User-Agent': 'Campus-Hardware-Exchange',
          },
        });
        const emails = await emailsRes.json();
        const primary = Array.isArray(emails) ? emails.find((e: any) => e.primary && e.verified) || emails[0] : null;
        email = primary?.email || `${userData.login}@users.noreply.github.com`;
      }
    }

    if (!email) {
      return NextResponse.redirect(new URL('/login?error=no_email_provided', baseUrl));
    }

    const users = await DatabaseService.getUsers();
    let user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      user = await DatabaseService.createUser({
        name,
        email,
        studentId: `ENG-2024-${Math.floor(1000 + Math.random() * 9000)}`,
        university: 'Institute of Engineering & Tech',
        department: provider === 'google' ? 'Electrical Engineering' : 'Computer Science & Systems',
        role: 'STUDENT',
        isVerifiedStudent: true,
        avatarUrl,
        trustRating: 5.0,
      });
    }

    const cookieStore = await cookies();
    cookieStore.set('session_user_id', user.id, { path: '/', httpOnly: true });
    cookieStore.set('user_role', user.role || 'STUDENT', { path: '/', httpOnly: true });
    cookieStore.set('user_email', user.email, { path: '/', httpOnly: true });
    cookieStore.set('oauth_provider', provider, { path: '/', httpOnly: true });

    return NextResponse.redirect(new URL(redirectTarget, baseUrl));
  } catch (err) {
    console.error('OAuth Callback Exception:', err);
    return NextResponse.redirect(new URL('/login?error=oauth_exception', baseUrl));
  }
}

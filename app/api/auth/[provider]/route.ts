import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) {
  const { provider } = await params;
  const searchParams = request.nextUrl.searchParams;
  const redirectTarget = searchParams.get('redirect') || '/';

  const host = request.headers.get('host') || 'localhost:3000';
  const protocol = request.headers.get('x-forwarded-proto') || (host.startsWith('localhost') ? 'http' : 'https');
  const baseUrl = `${protocol}://${host}`;
  const callbackUrl = `${baseUrl}/api/auth/callback/${provider}`;

  if (provider === 'google') {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    if (!clientId || clientId.includes('your-google-client-id') || clientId.trim() === '') {
      return NextResponse.redirect(
        new URL(`/login?error=oauth_config_missing&provider=Google`, baseUrl)
      );
    }

    const state = Buffer.from(JSON.stringify({ redirect: redirectTarget })).toString('base64');
    const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleAuthUrl.searchParams.set('client_id', clientId);
    googleAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    googleAuthUrl.searchParams.set('response_type', 'code');
    googleAuthUrl.searchParams.set('scope', 'openid email profile');
    googleAuthUrl.searchParams.set('access_type', 'offline');
    googleAuthUrl.searchParams.set('prompt', 'select_account');
    googleAuthUrl.searchParams.set('state', state);

    return NextResponse.redirect(googleAuthUrl.toString());
  }

  if (provider === 'github') {
    const clientId = process.env.GITHUB_CLIENT_ID;
    if (!clientId || clientId.includes('your-github-client-id') || clientId.trim() === '') {
      return NextResponse.redirect(
        new URL(`/login?error=oauth_config_missing&provider=GitHub`, baseUrl)
      );
    }

    const state = Buffer.from(JSON.stringify({ redirect: redirectTarget })).toString('base64');
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', clientId);
    githubAuthUrl.searchParams.set('redirect_uri', callbackUrl);
    githubAuthUrl.searchParams.set('scope', 'read:user user:email');
    githubAuthUrl.searchParams.set('state', state);

    return NextResponse.redirect(githubAuthUrl.toString());
  }

  return NextResponse.redirect(new URL('/login?error=unsupported_provider', baseUrl));
}

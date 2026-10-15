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

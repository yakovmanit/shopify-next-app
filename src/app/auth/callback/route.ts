import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForTokens } from '@/lib/shopify/oauth-server';

const TEMP_COOKIES = [
  'shopify_oauth_verifier',
  'shopify_oauth_state',
  'shopify_oauth_nonce',
  'shopify_oauth_return_to',
];

function getPublicOrigin(request: NextRequest): string {
  const fromEnv = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '');
  if (fromEnv) return fromEnv;
  const forwardedHost = request.headers.get('x-forwarded-host');
  const forwardedProto = request.headers.get('x-forwarded-proto') ?? 'https';
  if (forwardedHost) return `${forwardedProto}://${forwardedHost}`;
  return request.nextUrl.origin;
}

function redirectWithError(request: NextRequest, message: string) {
  const url = new URL('/', getPublicOrigin(request));
  url.searchParams.set('auth_error', message);
  const response = NextResponse.redirect(url);
  for (const name of TEMP_COOKIES) response.cookies.delete(name);
  return response;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const code = params.get('code');
  const stateFromUrl = params.get('state');
  const oauthError = params.get('error');

  if (oauthError) {
    return redirectWithError(request, oauthError);
  }

  if (!code || !stateFromUrl) {
    return redirectWithError(request, 'missing_code_or_state');
  }

  const verifier = request.cookies.get('shopify_oauth_verifier')?.value;
  const stateCookie = request.cookies.get('shopify_oauth_state')?.value;
  const returnTo = request.cookies.get('shopify_oauth_return_to')?.value ?? '/account';

  if (!verifier || !stateCookie || stateCookie !== stateFromUrl) {
    return redirectWithError(request, 'invalid_state');
  }

  try {
    const tokens = await exchangeCodeForTokens(code, verifier);

    const expiresAt = Math.floor(Date.now() / 1000) + tokens.expires_in;
    const cleanAccessToken = tokens.access_token.replace(/^shcat_/, '');

    const response = NextResponse.redirect(new URL(returnTo, getPublicOrigin(request)));

    const baseCookie = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      path: '/',
    };

    response.cookies.set('shopify_access_token', cleanAccessToken, {
      ...baseCookie,
      maxAge: tokens.expires_in,
    });
    response.cookies.set('shopify_refresh_token', tokens.refresh_token, {
      ...baseCookie,
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set('shopify_id_token', tokens.id_token, {
      ...baseCookie,
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set('shopify_token_expires_at', expiresAt.toString(), {
      ...baseCookie,
      maxAge: tokens.expires_in,
    });

    for (const name of TEMP_COOKIES) response.cookies.delete(name);

    return response;
  } catch (err) {
    console.error('OAuth callback error:', err);
    return redirectWithError(request, 'token_exchange_failed');
  }
}

import { NextRequest, NextResponse } from 'next/server';
import {
  buildAuthorizationUrl,
  generateCodeVerifier,
  generateNonce,
  generateState,
  validateClientOAuthConfig,
} from '@/lib/shopify/oauth-client';

const AUTH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 10,
};

export async function GET(request: NextRequest) {
  validateClientOAuthConfig();

  const verifier = generateCodeVerifier();
  const state = generateState();
  const nonce = generateNonce();

  const authUrl = await buildAuthorizationUrl(verifier, state, nonce);

  const returnTo = request.nextUrl.searchParams.get('returnTo') ?? '/account';

  const response = NextResponse.redirect(authUrl);

  response.cookies.set('shopify_oauth_verifier', verifier, AUTH_COOKIE_OPTIONS);
  response.cookies.set('shopify_oauth_state', state, AUTH_COOKIE_OPTIONS);
  response.cookies.set('shopify_oauth_nonce', nonce, AUTH_COOKIE_OPTIONS);
  response.cookies.set('shopify_oauth_return_to', returnTo, AUTH_COOKIE_OPTIONS);

  return response;
}

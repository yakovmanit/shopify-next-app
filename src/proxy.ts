import { NextRequest, NextResponse } from 'next/server';
import { getStoreEnv } from '@/lib';

const SAFETY_MARGIN_MS = 60_000;
const ACCESS_TOKEN_BUFFER = 30 * 24 * 60 * 60;

const AUTH_COOKIE_OPTS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  path: '/',
};

export async function proxy(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const expiresAt = request.cookies.get('expires_in_date')?.value;

  if (!accessToken || !refreshToken || !expiresAt) {
    return NextResponse.next();
  }

  const needsRefresh = Date.now() > Number(expiresAt) - SAFETY_MARGIN_MS;
  if (!needsRefresh) {
    return NextResponse.next();
  }

  const { clientId, shopDomain, credentials } = getStoreEnv();
  const response = NextResponse.next();

  try {
    const discovery = await fetch(
      `https://${shopDomain}/.well-known/openid-configuration`
    ).then(r => r.json());

    const tokenRes = await fetch(discovery.token_endpoint, {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${credentials}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: clientId!,
        refresh_token: refreshToken,
      }),
    });

    if (!tokenRes.ok) {
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      response.cookies.delete('expires_in_date');
      return response;
    }

    const data = await tokenRes.json();

    response.cookies.set('access_token', data.access_token, {
      ...AUTH_COOKIE_OPTS,
      maxAge: data.expires_in,
    });
    response.cookies.set('refresh_token', data.refresh_token, {
      ...AUTH_COOKIE_OPTS,
      maxAge: ACCESS_TOKEN_BUFFER,
    });
    response.cookies.set(
      'expires_in_date',
      String(Date.now() + data.expires_in * 1000),
      AUTH_COOKIE_OPTS
    );
  } catch (e) {
    console.error('Token refresh failed in middleware:', e);
  }

  return response;
}

export const config = {
  matcher: ['/account/:path*', '/api/customer/:path*'],
};
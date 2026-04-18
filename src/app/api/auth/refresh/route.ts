import { NextRequest, NextResponse } from 'next/server';
import { refreshAccessToken } from '@/lib/shopify/oauth-server';

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('shopify_refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ success: false, error: 'no_refresh_token' }, { status: 401 });
  }

  try {
    const tokens = await refreshAccessToken(refreshToken);

    const expiresAt = Math.floor(Date.now() / 1000) + tokens.expires_in;
    const cleanAccessToken = tokens.access_token.replace(/^shcat_/, '');

    const response = NextResponse.json({ success: true });

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
    response.cookies.set('shopify_token_expires_at', expiresAt.toString(), {
      ...baseCookie,
      maxAge: tokens.expires_in,
    });

    if (tokens.refresh_token) {
      response.cookies.set('shopify_refresh_token', tokens.refresh_token, {
        ...baseCookie,
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return response;
  } catch (err) {
    console.error('Refresh token error:', err);
    const response = NextResponse.json(
      { success: false, error: 'refresh_failed' },
      { status: 401 }
    );
    response.cookies.delete('shopify_access_token');
    response.cookies.delete('shopify_refresh_token');
    response.cookies.delete('shopify_id_token');
    response.cookies.delete('shopify_token_expires_at');
    return response;
  }
}

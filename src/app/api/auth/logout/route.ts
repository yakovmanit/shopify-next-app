import { NextRequest, NextResponse } from 'next/server';
import { buildLogoutUrl } from '@/lib/shopify/oauth-server';

const SESSION_COOKIES = [
  'shopify_access_token',
  'shopify_refresh_token',
  'shopify_id_token',
  'shopify_token_expires_at',
];

export async function POST(request: NextRequest) {
  const idToken = request.cookies.get('shopify_id_token')?.value;
  const rawBaseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? request.nextUrl.origin;
  const postLogoutUri = `${rawBaseUrl.replace(/\/+$/, '')}/`;

  const shopifyLogoutUrl = idToken
    ? buildLogoutUrl(idToken, postLogoutUri)
    : null;

  const response = NextResponse.json({
    success: true,
    logoutUrl: shopifyLogoutUrl,
  });

  for (const name of SESSION_COOKIES) response.cookies.delete(name);

  return response;
}

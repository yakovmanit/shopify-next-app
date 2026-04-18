import { NextRequest, NextResponse } from 'next/server';

interface IdTokenClaims {
  sub?: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  exp?: number;
}

function decodeIdToken(idToken: string): IdTokenClaims | null {
  const parts = idToken.split('.');
  if (parts.length !== 3) return null;
  try {
    const json = Buffer.from(parts[1], 'base64url').toString('utf-8');
    return JSON.parse(json) as IdTokenClaims;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  const accessToken = request.cookies.get('shopify_access_token')?.value;
  const idToken = request.cookies.get('shopify_id_token')?.value;
  const expiresAtStr = request.cookies.get('shopify_token_expires_at')?.value;

  if (!accessToken || !idToken) {
    return NextResponse.json({ isAuthenticated: false });
  }

  const now = Math.floor(Date.now() / 1000);
  const expiresAt = expiresAtStr ? parseInt(expiresAtStr, 10) : 0;
  const isExpired = !expiresAt || now >= expiresAt;

  const claims = decodeIdToken(idToken);

  return NextResponse.json({
    isAuthenticated: !isExpired,
    isExpired,
    user: claims
      ? {
          id: claims.sub,
          email: claims.email,
          emailVerified: claims.email_verified,
          name: claims.name,
          firstName: claims.given_name,
          lastName: claims.family_name,
        }
      : null,
    expiresAt,
  });
}

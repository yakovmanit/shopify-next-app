// Cookie management

import { cookies } from 'next/headers';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: 60 * 60 * 24 * 7,
};

const COOKIE_NAMES = {
  ACCESS_TOKEN: 'shopify_access_token',
  REFRESH_TOKEN: 'shopify_refresh_token',
  ID_TOKEN: 'shopify_id_token',
  EXPIRES_AT: 'shopify_token_expires_at',
} as const;

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresAt: number;
}

export function formatAccessToken(token: string): string {
  if (token.startsWith('shcat_')) {
    return token;
  }
  return `shcat_${token}`;
}

function removeTokenPrefix(token: string): string {
  if (token.startsWith('shcat_')) {
    return token.replace('shcat_', '');
  }
  return token;
}

export async function setTokens(
  accessToken: string,
  refreshToken: string,
  idToken: string,
  expiresIn: number
): Promise<void> {
  const cookieStore = await cookies();

  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;

  const cleanToken = removeTokenPrefix(accessToken);

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, cleanToken, {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn,
  });

  cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set(COOKIE_NAMES.ID_TOKEN, idToken, {
    ...COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });

  cookieStore.set(COOKIE_NAMES.EXPIRES_AT, expiresAt.toString(), {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn,
  });
}

export async function getTokens(): Promise<SessionTokens | null> {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
  const idToken = cookieStore.get(COOKIE_NAMES.ID_TOKEN)?.value;
  const expiresAt = cookieStore.get(COOKIE_NAMES.EXPIRES_AT)?.value;

  if (!accessToken || !refreshToken || !idToken || !expiresAt) {
    return null;
  }

  return {
    accessToken: formatAccessToken(accessToken),
    refreshToken,
    idToken,
    expiresAt: parseInt(expiresAt, 10),
  };
}

export async function clearTokens(): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_NAMES.ID_TOKEN);
  cookieStore.delete(COOKIE_NAMES.EXPIRES_AT);
}

export async function updateAccessToken(
  accessToken: string,
  expiresIn: number
): Promise<void> {
  const cookieStore = await cookies();

  const expiresAt = Math.floor(Date.now() / 1000) + expiresIn;
  const cleanToken = removeTokenPrefix(accessToken);

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, cleanToken, {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn,
  });

  cookieStore.set(COOKIE_NAMES.EXPIRES_AT, expiresAt.toString(), {
    ...COOKIE_OPTIONS,
    maxAge: expiresIn,
  });
}

export function isTokenExpired(expiresAt: number): boolean {
  const now = Math.floor(Date.now() / 1000);
  const bufferSeconds = 5 * 60;

  return now >= (expiresAt - bufferSeconds);
}

export async function getValidAccessToken(): Promise<string | null> {
  const tokens = await getTokens();

  if (!tokens) {
    return null;
  }

  if (isTokenExpired(tokens.expiresAt)) {
    console.warn('Access token expired, refresh needed');
    return null;
  }

  return tokens.accessToken;
}

export async function debugSessionInfo(): Promise<void> {
  if (process.env.NODE_ENV !== 'development') {
    return; // Тільки в development
  }

  const tokens = await getTokens();

  if (!tokens) {
    console.log('🔐 Session: No active session');
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = tokens.expiresAt - now;
  const isExpired = isTokenExpired(tokens.expiresAt);

  console.log('🔐 Session Info:', {
    hasAccessToken: !!tokens.accessToken,
    hasRefreshToken: !!tokens.refreshToken,
    hasIdToken: !!tokens.idToken,
    expiresIn: `${Math.floor(timeUntilExpiry / 60)} minutes`,
    isExpired,
    needsRefresh: isExpired,
  });
}

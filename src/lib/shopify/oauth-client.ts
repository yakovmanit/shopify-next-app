// PKCE, redirect URL generation

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(hash));
}

export function generateState(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64URLEncode(array);
}

function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function normalizeShopId(raw: string): string {
  const match = raw.match(/(\d+)(?!.*\d)/);
  if (!match) throw new Error(`Invalid NEXT_PUBLIC_SHOPIFY_SHOP_ID: ${raw}`);
  return match[1];
}

export async function buildAuthorizationUrl(
  verifier: string,
  state: string,
  nonce: string
): Promise<string> {
  const rawShopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!rawShopId || !clientId || !baseUrl) {
    throw new Error('Missing required environment variables for OAuth');
  }

  const shopId = normalizeShopId(rawShopId);
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

  const codeChallenge = await generateCodeChallenge(verifier);

  const scopes = 'openid email customer-account-api:full';

  const redirectUri = `${normalizedBaseUrl}/auth/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
    state: state,
    nonce: nonce,
    response_type: 'code', // Authorization Code Flow
    code_challenge: codeChallenge,
    code_challenge_method: 'S256', // SHA-256
  });

  const authUrl = `https://shopify.com/authentication/${shopId}/oauth/authorize`;

  return `${authUrl}?${params.toString()}`;
}

export function validateClientOAuthConfig(): void {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SHOPIFY_SHOP_ID',
    'NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID',
    'NEXT_PUBLIC_BASE_URL',
  ];

  const missing = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required client environment variables: ${missing.join(', ')}\n` +
      'Add these to your .env.local file'
    );
  }
}

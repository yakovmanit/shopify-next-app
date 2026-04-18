// Token exchange, refresh, revoke

interface TokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  token_type: 'Bearer';
  scope: string;
}

interface OAuthError {
  error: string;
  error_description?: string;
}


export function validateServerOAuthConfig(): void {
  const requiredEnvVars = [
    'NEXT_PUBLIC_SHOPIFY_SHOP_ID',
    'NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID',
    'SHOPIFY_CUSTOMER_API_CLIENT_SECRET',
    'NEXT_PUBLIC_BASE_URL',
  ];

  const missing = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missing.length > 0) {
    throw new Error(
      `Missing required server environment variables: ${missing.join(', ')}\n` +
      'Add these to your .env.local file'
    );
  }
}


// Helper Functions

function isOAuthError(data: TokenResponse | OAuthError): data is OAuthError {
  return 'error' in data;
}

function normalizeShopId(raw: string): string {
  const match = raw.match(/(\d+)(?!.*\d)/);
  if (!match) throw new Error(`Invalid NEXT_PUBLIC_SHOPIFY_SHOP_ID: ${raw}`);
  return match[1];
}

function getOAuthConfig() {
  const rawShopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_CUSTOMER_API_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!rawShopId || !clientId || !clientSecret || !baseUrl) {
    throw new Error('Missing OAuth configuration');
  }

  const shopId = normalizeShopId(rawShopId);
  const normalizedBaseUrl = baseUrl.replace(/\/+$/, '');

  return {
    shopId,
    clientId,
    clientSecret,
    baseUrl: normalizedBaseUrl,
    tokenEndpoint: `https://shopify.com/authentication/${shopId}/oauth/token`,
    logoutEndpoint: `https://shopify.com/authentication/${shopId}/logout`,
  };
}


// Main OAuth Functions

export async function exchangeCodeForTokens(
  code: string,
  verifier: string
): Promise<TokenResponse> {
  const config = getOAuthConfig();

  // Параметри для token exchange
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: code,
    code_verifier: verifier,
    redirect_uri: `${config.baseUrl}/auth/callback`,
  });

  try {
    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok || isOAuthError(data)) {
      const errorMsg = isOAuthError(data)
        ? `${data.error}: ${data.error_description || 'No description'}`
        : `HTTP ${response.status}`;

      throw new Error(`Token exchange failed: ${errorMsg}`);
    }

    return data as TokenResponse;
  } catch (error) {
    console.error('Token exchange error:', error);
    throw error;
  }
}

export async function refreshAccessToken(
  refreshToken: string
): Promise<TokenResponse> {
  const config = getOAuthConfig();

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: config.clientId,
    client_secret: config.clientSecret,
    refresh_token: refreshToken,
  });

  try {
    const response = await fetch(config.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const data = await response.json();

    if (!response.ok || isOAuthError(data)) {
      const errorMsg = isOAuthError(data)
        ? `${data.error}: ${data.error_description || 'No description'}`
        : `HTTP ${response.status}`;

      throw new Error(`Token refresh failed: ${errorMsg}`);
    }

    return data as TokenResponse;
  } catch (error) {
    console.error('Token refresh error:', error);
    throw error;
  }
}

export function buildLogoutUrl(idToken: string, returnTo?: string): string {
  const config = getOAuthConfig();

  const params = new URLSearchParams({
    id_token_hint: idToken,
  });

  if (returnTo) {
    params.set('post_logout_redirect_uri', returnTo);
  }

  return `${config.logoutEndpoint}?${params.toString()}`;
}

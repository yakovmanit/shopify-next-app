import {getStoreEnv} from "@/lib";
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export async function GET(request: NextRequest) {
  const cookiesStore = await cookies();

  const { baseStoreUrl, clientId, shopDomain, credentials } = getStoreEnv();

  const params = request.nextUrl.searchParams;
  const code = params.get('code');

  const codeVerifier = cookiesStore.get('code-verifier')?.value;

  if (!shopDomain || !clientId || !baseStoreUrl || !code || !codeVerifier) {
    return NextResponse.json({message: "Necessary data not found"});
  }

  const discoveryResponse = await fetch(`https://${shopDomain}/.well-known/openid-configuration`);
  const config = await discoveryResponse.json();

  const body = new URLSearchParams({
    'grant_type': 'authorization_code',
    'client_id': clientId,
    'redirect_uri': `${baseStoreUrl}/auth/callback`,
    'code': code as string,
    'code_verifier': codeVerifier
  });

  const headers = {
    'content-type': 'application/x-www-form-urlencoded',
    // Confidential Client
    'Authorization': `Basic ${credentials}`
  }

  const response = await fetch(config.token_endpoint, {
    method: 'POST',
    headers: headers,
    body,
  });

  const { access_token, expires_in, id_token, refresh_token }: AccessTokenResponse = await response.json();

  const expiresInDate = (Date.now() + expires_in * 1000).toString();

  cookiesStore.set('access_token', access_token);
  cookiesStore.set('id_token', id_token);
  cookiesStore.set('refresh_token', refresh_token);
  cookiesStore.set('expires_in_date', expiresInDate);

  return NextResponse.redirect(`${baseStoreUrl}/account`);
}
import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {getStoreEnv} from "@/lib";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
}

export async function GET() {
  const { clientId, shopDomain, credentials } = getStoreEnv();

  const cookiesStore = await cookies();

  const expiresInDate = cookiesStore.get('expires_in_date')?.value;
  const accessToken = cookiesStore.get('access_token')?.value;
  const refreshToken = cookiesStore.get('refresh_token')?.value;

  if (!expiresInDate || !accessToken || !refreshToken || !clientId) {
    return NextResponse.json({ isAuthenticated: false }, { status: 200 });
  }

  const isTokenExpired = Date.now() > Number(expiresInDate);

  if (isTokenExpired) {
    const discoveryResponse = await fetch(`https://${shopDomain}/.well-known/openid-configuration`);
    const config = await discoveryResponse.json();

    const body = new URLSearchParams({
      'grant_type': 'refresh_token',
      'client_id': clientId,
      'refresh_token': refreshToken,
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

    const { access_token, expires_in, refresh_token }: Omit<AccessTokenResponse, 'id_token'> = await response.json();

    const expiresInDate = (Date.now() + expires_in * 1000).toString();

    cookiesStore.set('access_token', access_token);
    cookiesStore.set('refresh_token', refresh_token);
    cookiesStore.set('expires_in_date', expiresInDate);

    return NextResponse.json({
      isAuthenticated: true,
      token: access_token,
    }, {status: 200});
  }

  return NextResponse.json({
    isAuthenticated: true,
    token: accessToken,
  }, {status: 200});
}
import {NextResponse} from "next/server";
import {generateCodeChallenge, generateCodeVerifier, generateNonce, generateState, getStoreEnv} from "@/lib";
import {cookies} from "next/headers";

export async function GET() {
  const cookiesStore = await cookies();

  const { baseStoreUrl, clientId, shopDomain } = getStoreEnv();

  if (!shopDomain || !clientId || !baseStoreUrl) {
    return NextResponse.json({message: "Necessary data not found"});
  }

  const state = await generateState();
  const nonce = await generateNonce(16);
  const verifier = await generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);

  cookiesStore.set('code-verifier', verifier);

  const discoveryResponse = await fetch(`https://${shopDomain}/.well-known/openid-configuration`);
  const authConfig = await discoveryResponse.json();

  const authorizationRequestUrl = new URL(authConfig.authorization_endpoint);

  const authSearchParams = new URLSearchParams({
    'scope': 'openid email customer-account-api:full',
    'client_id': clientId,
    'response_type': 'code',
    'redirect_uri': `${baseStoreUrl}/auth/callback`,
    'state': state,
    'nonce': nonce,
    'code_challenge': challenge,
    'code_challenge_method': 'S256',
  });

  const redirectUrl = `${authorizationRequestUrl}?${authSearchParams}`;

  return NextResponse.redirect(redirectUrl);
}
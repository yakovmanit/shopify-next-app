import {getSession} from "@/lib/server/get-session";

export async function ShopifyCustomerData(query: string, variables?: object) {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  const { accessToken } = await getSession();

  const apiDiscoveryResponse = await fetch(`https://${shopDomain}/.well-known/customer-account-api`);
  const apiConfig = await apiDiscoveryResponse.json();

  const graphqlEndpoint = apiConfig.graphql_api;

  try {
    const body = {
      query,
      variables: variables || undefined
    }

    const customerAccountData = await fetch(graphqlEndpoint, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${accessToken}`
      },
      method: 'POST',
      body: JSON.stringify(body),
    });

    const responseData = await customerAccountData.json();

    return responseData.data;

  } catch (error) {
    console.error('Shopify Customer API Error:', error);
    throw error;
  }
}
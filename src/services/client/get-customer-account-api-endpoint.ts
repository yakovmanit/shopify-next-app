export async function getCustomerAccountApiEndpoint(): Promise<string> {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  try {
    const apiDiscoveryUrl = `https://${domain}/.well-known/customer-account-api`;

    const response = await fetch(apiDiscoveryUrl);
    const apiConfig = await response.json();

    return apiConfig.graphql_api;
  } catch (error) {
    console.error('Error fetching Customer Account API endpoint:', error);
    throw error;
  }
}
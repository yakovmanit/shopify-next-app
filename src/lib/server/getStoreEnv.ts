export const getStoreEnv = () => {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const baseStoreUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const clientSecret = process.env.SHOPIFY_CUSTOMER_API_CLIENT_SECRET;
  const credentials = btoa(`${clientId}:${clientSecret}`);

  return {
    shopDomain,
    clientId,
    baseStoreUrl,
    credentials,
  };
}
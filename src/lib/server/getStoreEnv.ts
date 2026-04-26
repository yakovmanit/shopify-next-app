export const getStoreEnv = () => {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_API_CLIENT_ID;
  const baseStoreUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return {
    shopDomain,
    clientId,
    baseStoreUrl,
  };
}
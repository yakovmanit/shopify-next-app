import {axiosInstance} from "@/services";
import {getSession} from "@/lib/server/get-session";

/**
* ShopifyData
* Makes a POST request to the Shopify GraphQL API with the provided query.
*
* @param {string} query - The GraphQL query string to be sent to the Shopify API.
* @param {object} variables - Optional variables object for the GraphQL query.
*
* @returns {Promise<any>} - A promise that resolves to the data returned from the Shopify API.
* */

export async function ShopifyData(query: string, variables?: object) {
  try {
    return (await axiosInstance.post('', {
      query,
      variables: variables || undefined
    })).data.data;

  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

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
import {axiosInstance} from "@/services/instance";

/*
* ShopifyData
* Makes a POST request to the Shopify GraphQL API with the provided query.
*
* @param {string} query - The GraphQL query string to be sent to the Shopify API.
* @param {object} variables - Optional variables object for the GraphQL query.
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
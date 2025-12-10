import axios from "axios";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;

export const axiosInstance = axios.create({
  baseURL: `https://${domain}/api/2025-10/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});
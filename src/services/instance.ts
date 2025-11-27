import axios from "axios";

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESSTOKEN;

export const axiosInstance = axios.create({
  baseURL: `https://${domain}/api/2025-10/graphql.json`,
  headers: {
    "Content-Type": "application/json",
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
  },
});
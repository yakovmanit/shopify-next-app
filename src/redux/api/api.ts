import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError,} from '@reduxjs/toolkit/query/react';
import {getCustomerAccountApiEndpoint} from "@/services/client";
import {getCustomerAccessToken} from "@/actions/auth";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;

// TODO: remove Storefront API and Customer Account API to separate files

// Storefront API
const baseStorefrontQuery = fetchBaseQuery({
  baseUrl: `https://${domain}/api/2025-10/graphql.json`,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    headers.set('X-Shopify-Storefront-Access-Token', storefrontAccessToken || '');
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseStorefrontQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Error: Unauthorized. Reauthenticating...', result.error);
  }

  return result;
};

export const storefrontApi = createApi({
  reducerPath: 'storefrontApi',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Cart'],
});

// Customer Account API
const baseCustomerAccountQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (
  args,
  api,
  extraOptions
) => {
  const graphqlEndpoint = await getCustomerAccountApiEndpoint();
  const customerAccessToken = await getCustomerAccessToken();

  const dynamicCustomerAccountQuery = fetchBaseQuery({
    baseUrl: graphqlEndpoint,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', customerAccessToken);
      return headers;
    },
  });

  return dynamicCustomerAccountQuery(args, api, extraOptions);
}

export const customerAccountApi = createApi({
  reducerPath: 'customerAccountApi',
  baseQuery: baseCustomerAccountQuery,
  endpoints: () => ({}),
  tagTypes: [],
});
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_API_ACCESS_TOKEN;

const baseQuery = fetchBaseQuery({
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
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    console.log('Error: Unauthorized. Reauthenticating...', result.error);
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: ['Cart'],
});

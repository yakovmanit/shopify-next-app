import { api } from '../api';
import {AddToCartMutation, CreateCartMutation, GetCartQuery} from '@/types/storefront/storefront.generated';

const CART_QUERY = `#graphql
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  title
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  priceRange {
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  featuredImage {
                    altText
                    id
                    url
                  }
                }
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;

const CREATE_CART_MUTATION = `#graphql
  mutation CreateCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
      }
    }
  }
`;

const ADD_TO_CART_MUTATION = `#graphql
  mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    id
                    title
                    priceRange {
                      maxVariantPrice {
                        amount
                        currencyCode
                      }
                    }
                    featuredImage {
                      altText
                      id
                      url
                    }
                  }
                }
              }
            }
          }
        }
        cost {
          totalAmount {
            amount
            currencyCode
          }
          subtotalAmount {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

const cartApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      getCart: build.query<GetCartQuery['cart'], { id: string }>({
        query: (args) => ({
          url: '',
          method: 'POST',
          body: {
            query: CART_QUERY,
            variables: {
              id: args.id,
            },
          },
        }),
        transformResponse: (response: { data: GetCartQuery }) => response.data.cart,
        providesTags: ['Cart'],
      }),

      createCart: build.mutation<NonNullable<CreateCartMutation['cartCreate']>['cart'], { lines: Array<{ merchandiseId: string; quantity: number }> }>({
        query: (input) => ({
          url: '',
          method: 'POST',
          body: {
            query: CREATE_CART_MUTATION,
            variables: { input },
          },
        }),
        transformResponse: (response: { data: CreateCartMutation }) => response?.data?.cartCreate?.cart,
        invalidatesTags: ['Cart'],
      }),

      addToCart: build.mutation<NonNullable<AddToCartMutation['cartLinesAdd']>['cart'], { cartId: string; lines: Array<{ merchandiseId: string; quantity: number }> }>({
        query: ({ cartId, lines }) => ({
          url: '',
          method: 'POST',
          body: {
            query: ADD_TO_CART_MUTATION,
            variables: {
              cartId,
              lines,
            },
          },
        }),
        transformResponse: (response: { data: AddToCartMutation }) => response.data.cartLinesAdd?.cart,
        invalidatesTags: ['Cart'],
      }),
    }),

    overrideExisting: false,
  })
  .enhanceEndpoints({
    addTagTypes: ['Cart'],
    endpoints: {},
  });

export const {
  useGetCartQuery,
  useCreateCartMutation,
  useAddToCartMutation,
} = cartApi;
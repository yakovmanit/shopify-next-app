import { api } from '../api';
import {
  AddToCartMutation,
  CartLinesUpdateMutation,
  CreateCartMutation,
  GetCartQuery
} from '@/types/storefront/storefront.generated';
import {
  GET_CART_QUERY,
  CREATE_CART_MUTATION,
  ADD_TO_CART_MUTATION,
  UPDATE_CART_LINES_QUERY,
} from "@/constants/queries";

const cartApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      getCart: build.query<
        GetCartQuery['cart'],
        { id: string }
      >({
        query: (args) => ({
          url: '',
          method: 'POST',
          body: {
            query: GET_CART_QUERY,
            variables: {
              id: args.id,
            },
          },
        }),
        transformResponse: (response: { data: GetCartQuery }) => response.data.cart,
        providesTags: ['Cart'],
      }),

      createCart: build.mutation<
        NonNullable<CreateCartMutation['cartCreate']>['cart'],
        { lines: { merchandiseId: string; quantity: number }[] }
      >({
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

      addToCart: build.mutation<
        NonNullable<AddToCartMutation['cartLinesAdd']>['cart'],
        { cartId: string; lines: { merchandiseId: string; quantity: number }[] }
      >({
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

      cartLinesUpdateMutation: build.mutation<
        CartLinesUpdateMutation,
        { cartId: string; lines: { id: string; merchandiseId: string; quantity: number }[] }
      >({
        query: ({ cartId, lines }) => ({
          url: '',
          method: 'POST',
          body: {
            query: UPDATE_CART_LINES_QUERY,
            variables: {
              cartId,
              lines,
            },
          },
        }),
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
  useCartLinesUpdateMutationMutation,
} = cartApi;
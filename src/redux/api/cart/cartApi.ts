import { api } from '../api';
import {AddToCartMutation, CreateCartMutation, GetCartQuery} from '@/types/storefront/storefront.generated';
import {addToCartMutation, createCartMutation, getCartQuery} from "@/constants/queries";

const cartApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      getCart: build.query<GetCartQuery['cart'], { id: string }>({
        query: (args) => ({
          url: '',
          method: 'POST',
          body: {
            query: getCartQuery,
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
            query: createCartMutation,
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
            query: addToCartMutation,
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
import {api} from "@/redux/api/api";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";
import {GET_COLLECTION_QUERY} from "@/constants/queries/product/get-collection-query";

type ProductsPage = NonNullable<GetCollectionQuery['collection']>['products']['edges'];

type PageInfo = NonNullable<GetCollectionQuery['collection']>['products']['pageInfo'];

type CollectionProductsResult = {
  edges: ProductsPage;
  pageInfo: PageInfo;
};

const productApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      getProductsByCategory: build.infiniteQuery<
        CollectionProductsResult,                                     // ResultType
        { handle: string, first: number, selectedTypes?: string[] },  // QueryArg - 'handle', 'first' and 'selectedTypes'
        string | null                                                 // PageParam - cursor
      >({
        infiniteQueryOptions: {
          initialPageParam: null,
          getNextPageParam: (lastPage) => {
            if (!lastPage.pageInfo.hasNextPage) {
              return undefined;
            }
            return lastPage.pageInfo.endCursor ?? undefined;
          },
        },
        query: ({ queryArg, pageParam }) => {
          const filters: { productType: string; }[] = [];

          if (queryArg.selectedTypes && queryArg.selectedTypes.length > 0) {
            queryArg.selectedTypes.forEach(type => {
              filters.push({
                productType: type,
              });
            });
          }

          return {
            url: '',
            method: 'POST',
            body: {
              query: GET_COLLECTION_QUERY,
              variables: {
                handle: queryArg.handle,
                first: queryArg.first,
                after: pageParam,
                filters: filters,
              },
            },
          }
        },
        transformResponse: (response: { data: GetCollectionQuery }) => {
          return response?.data?.collection?.products ?? {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              endCursor: null
            }
          };
        },
      }),
    }),
  });

export const {
  useGetProductsByCategoryInfiniteQuery
} = productApi;
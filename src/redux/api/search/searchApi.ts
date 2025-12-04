import { GetSearchResultsQuery } from "@/types/storefront/storefront.generated";
import {api} from "../api";
import {GET_SEARCH_RESULTS_QUERY} from "@/constants/queries";

const searchApi = api
  .injectEndpoints({
    endpoints: (build) => ({
      getSearchResults: build.query<
        GetSearchResultsQuery['predictiveSearch'],
        { query: string }
      >({
        query: (args) => ({
          url: '',
          method: 'POST',
          body: {
            query: GET_SEARCH_RESULTS_QUERY,
            variables: {
              query: args.query,
            },
          },
        }),
        transformResponse(response: { data: GetSearchResultsQuery }) {
          return response.data.predictiveSearch;
        }
      }),
    }),
  });

export const {
  useLazyGetSearchResultsQuery,
} = searchApi;
import {customerAccountApi} from "@/redux/api/api";
import {GetCustomerAddressesQuery} from "@/types/generated/customeraccountapi.generated";
import {GET_CUSTOMER_ADDRESSES_QUERY} from "@/constants/queries";

const addressApi = customerAccountApi
  .injectEndpoints({
    endpoints: (build) => ({
      getCustomerAddresses: build.query<
        GetCustomerAddressesQuery['customer']['addresses']['edges'],
        { addressesCount: number }
      >({
        query: (args) => ({
          url: '',
          method: 'POST',
          body: {
            query: GET_CUSTOMER_ADDRESSES_QUERY,
            variables: {
              first: args.addressesCount,
            },
          },
        }),
        transformResponse(response: { data: GetCustomerAddressesQuery }) {
          return response.data.customer.addresses.edges;
        }
      }),
    }),
  });

export const {
  useGetCustomerAddressesQuery,
} = addressApi;
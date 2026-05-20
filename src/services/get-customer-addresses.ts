import {ShopifyCustomerData} from "@/lib";
import {GetCustomerAddressesQuery} from "@/types/generated/customeraccountapi.generated";
import {GET_CUSTOMER_ADDRESSES_QUERY} from "@/constants/queries";

export async function getCustomerAddresses(first: number) {
  const variables = {
    first,
  };

  const response: GetCustomerAddressesQuery = await ShopifyCustomerData(GET_CUSTOMER_ADDRESSES_QUERY, variables);

  return response?.customer.addresses.edges;
}

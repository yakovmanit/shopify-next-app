import {GET_CUSTOMER_ADDRESSES_QUERY} from "@/constantsAccount/get-customer-addresses-query";
import {ShopifyCustomerData} from "@/lib/shopify";
import {GetCustomerAddressesQuery} from "@/types/customer/customer.generated";

export async function getCustomerAddresses(first: number) {
  const variables = {
    first,
  };

  const response: GetCustomerAddressesQuery = await ShopifyCustomerData(GET_CUSTOMER_ADDRESSES_QUERY, variables);

  return response?.customer.addresses.edges;
}

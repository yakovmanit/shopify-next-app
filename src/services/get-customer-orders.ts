import {ShopifyData} from "@/lib/shopify";
import {GET_CUSTOMER_ORDERS_QUERY} from "@/constants/queries";
import {GetCustomerOrdersQuery} from "@/types/storefront/storefront.generated";

export async function getCustomerOrders(customerAccessToken: string) {
  const variables = {
    customerAccessToken,
  };

  const response: GetCustomerOrdersQuery = await ShopifyData(GET_CUSTOMER_ORDERS_QUERY, variables);

  return response.customer?.orders.edges;
}

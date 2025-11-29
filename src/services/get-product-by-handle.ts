import {ShopifyData} from "@/lib/shopify";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";
import {GET_PRODUCT_BY_HANDLE_QUERY} from "@/constants/queries";

export async function getProductByHandle(handle: string) {
  const variables = {
    handle,
  };

  const response: GetProductByHandleQuery = await ShopifyData(GET_PRODUCT_BY_HANDLE_QUERY, variables);

  return response.product;
}

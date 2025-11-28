import {ShopifyData} from "@/lib/shopify";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";
import {getProductByHandleQuery} from "@/constants/queries";

export async function getProductByHandle(handle: string) {
  const variables = {
    handle,
  };

  const response: GetProductByHandleQuery = await ShopifyData(getProductByHandleQuery, variables);

  return response.product;
}

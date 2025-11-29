import {ShopifyData} from "@/lib/shopify";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";
import {GET_COLLECTION_QUERY} from "@/constants/queries/product/get-collection-query";

export async function getCollection(handle: string) {
  const variables = {
    handle,
  };

  const response: GetCollectionQuery = await ShopifyData(GET_COLLECTION_QUERY, variables);

  return response?.collection;
}

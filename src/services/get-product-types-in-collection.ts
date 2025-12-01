import {ShopifyData} from "@/lib";
import {GET_TYPES_AND_PRICES_IN_COLLECTION_QUERY} from "@/constants/queries";
import {GetTypesAndPricesInCollectionQuery} from "@/types/storefront/storefront.generated";

export async function getTypesAndPricesInCollection(handle: string) {
  const variables = {
    handle,
  };

  const response: GetTypesAndPricesInCollectionQuery = await ShopifyData(GET_TYPES_AND_PRICES_IN_COLLECTION_QUERY, variables);

  return response?.collection?.products?.edges;
}
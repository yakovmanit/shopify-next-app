import {ShopifyData} from "@/lib";
import {GET_PRODUCT_TYPES_IN_COLLECTION_QUERY} from "@/constants/queries";
import {GetProductTypesInCollectionQuery} from "@/types/storefront/storefront.generated";

export async function getProductTypesInCollection(handle: string) {
  const variables = {
    handle,
  };

  const response: GetProductTypesInCollectionQuery = await ShopifyData(GET_PRODUCT_TYPES_IN_COLLECTION_QUERY, variables);

  return response?.collection?.products?.edges?.map(edge => edge?.node?.productType) || [];
}
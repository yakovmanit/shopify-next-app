import {ShopifyData} from "@/lib/shopify";
import {GetProductsFromCollectionQuery} from "@/types/storefront/storefront.generated";
import {GET_PRODUCT_FROM_COLLECTION} from "@/constants/queries/product/get-products-from-collection-query";

export async function getProductsFromCollection() {
  const response: GetProductsFromCollectionQuery = await ShopifyData(GET_PRODUCT_FROM_COLLECTION);

  return response?.collection?.products?.edges.flatMap(({node}) => node);
}

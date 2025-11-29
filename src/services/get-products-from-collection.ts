import {ShopifyData} from "@/lib/shopify";
import {GetProductsFromCollectionQuery} from "@/types/storefront/storefront.generated";
import {getProductsFromCollectionQuery} from "@/constants/queries/product/get-products-from-collection-query";

export async function getProductsFromCollection() {
  const response: GetProductsFromCollectionQuery = await ShopifyData(getProductsFromCollectionQuery);

  return response?.collection?.products?.edges.flatMap(({node}) => node);
}

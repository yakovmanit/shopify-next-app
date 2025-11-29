import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

/**
 * Transforms Shopify collection data into a normalized product array.
 *
 * Converts the nested GraphQL response structure (edges/nodes) into a flat array
 * of product objects with only the essential fields needed for rendering the collection.
 *
 * @param collection - Collection data from Shopify's GraphQL API
 *
 * @returns Array of normalized product objects with id, title, price, image, variants, etc.
 */

export const normalizeProductsFromCollection = (
  collection: GetCollectionQuery['collection']
) => {
  return collection?.products?.edges?.map(product => ({
    id: product.node.id,
    title: product.node.title,
    price: product.node.priceRange.maxVariantPrice.amount,
    currencyCode: product.node.priceRange.maxVariantPrice.currencyCode,
    image: product.node.images.edges[0].node.url,
    handle: product.node.handle,
    description: product.node.description,
    variants: product.node.variants.edges.map(variant => ({
      id: variant.node.id,
      title: variant.node.title,
      quantityAvailable: variant.node.quantityAvailable,
    })),
  }));
}
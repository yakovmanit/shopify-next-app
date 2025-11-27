import {ShopifyData} from "@/lib/shopify";
import {GetProductsFromCollectionQuery} from "@/types/storefront/storefront.generated";

export async function getProductsFromCollection() {
  const query = `#graphql
    query GetProductsFromCollection {
      collection(handle: "frontpage") {
        id
        handle
        title
        products(first: 25) {
          edges {
            node {
              id
              handle
              title
              priceRange {
                maxVariantPrice {
                  amount
                  currencyCode
                }
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              description
              images(first: 5) {
                edges {
                  node {
                    id
                    altText
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const response: GetProductsFromCollectionQuery = await ShopifyData(query);

  return response?.collection?.products?.edges.flatMap(({node}) => node);
}

export const getProductsFromCollectionQuery = `#graphql
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
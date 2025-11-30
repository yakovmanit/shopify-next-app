export const GET_COLLECTION_QUERY = `#graphql
  query GetCollection($handle: String!, $first: Int, $after: String) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first, after: $after) {
        edges {
          node {
            id
            handle
            title
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                }
              }
            }
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
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`;
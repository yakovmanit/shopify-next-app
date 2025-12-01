export const GET_PRODUCT_TYPES_IN_COLLECTION_QUERY = `#graphql
  query GetProductTypesInCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 250) {
        edges {
          node {
            id
            productType
          }
        }
      }
    }
  }
`;
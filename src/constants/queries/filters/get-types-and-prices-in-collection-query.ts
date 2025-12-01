export const GET_TYPES_AND_PRICES_IN_COLLECTION_QUERY = `#graphql
  query GetTypesAndPricesInCollection($handle: String!) {
    collection(handle: $handle) {
      id
      title
      products(first: 250) {
        edges {
          node {
            id
            productType
            variants(first: 250) {
            edges {
                node {
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
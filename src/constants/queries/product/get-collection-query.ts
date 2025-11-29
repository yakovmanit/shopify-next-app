export const GET_COLLECTION_QUERY = `#graphql
  query GetCollection {
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
      }
    }
  }
`;
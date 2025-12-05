export const GET_COLLECTION_QUERY = `#graphql
  query GetCollection($handle: String!, $first: Int, $after: String, $filters: [ProductFilter!]) {
    collection(handle: $handle) {
      id
      handle
      title
      products(first: $first, after: $after, filters: $filters) {
        edges {
          node {
            id
            handle
            title
            productType
            description
            options(first: 100) {
              id
              name
              optionValues {
                id
                name
              }
            }
            variants(first: 100) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  selectedOptions {
                    name
                    value
                  }
                  price {
                    amount
                    currencyCode
                  }
                  image {
                    id
                    altText
                    url
                  }
                }
              }
            }
            images(first: 100) {
              edges {
                node {
                  id
                  altText
                  url
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
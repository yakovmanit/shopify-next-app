export const GET_SEARCH_RESULTS_QUERY = `#graphql
  query GetSearchResults($query: String!) {
    predictiveSearch(query: $query) {
      products {
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
        featuredImage {
          altText
          id
          url
        }
        handle
        collections(first: 5) {
          edges {
            node {
              title
            }
          }
        }
      }
      collections {
        id
        title
        handle
        products(first: 250) {
          edges {
            node {
              id
            }
          }
        }
      }
      queries {
        text
      }
    }
  }
`;
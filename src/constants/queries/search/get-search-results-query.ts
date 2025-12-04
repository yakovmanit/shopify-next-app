export const GET_SEARCH_RESULTS_QUERY = `#graphql
  query GetSearchResults($query: String!) {
    predictiveSearch(query: $query) {
      products {
        title
        featuredImage {
          altText
          id
          url
        }
        handle
      }
      collections {
        id
        title
        handle
      }
      queries {
        text
      }
    }
  }
`;
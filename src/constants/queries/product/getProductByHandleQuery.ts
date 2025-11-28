export const getProductByHandleQuery = `#graphql
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
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
`;
export const GET_PRODUCT_BY_HANDLE_QUERY = `#graphql
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
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
`;
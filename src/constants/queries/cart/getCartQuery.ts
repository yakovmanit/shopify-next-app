export const getCartQuery = `#graphql
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      createdAt
      updatedAt
      checkoutUrl
      lines(first: 10) {
        edges {
          node {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  id
                  title
                  variants(first: 100) {
                    edges {
                      node {
                        id
                        quantityAvailable
                        price {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                  priceRange {
                    maxVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  featuredImage {
                    altText
                    id
                    url
                  }
                }
              }
            }
            attributes {
              key
              value
            }
          }
        }
      }
      cost {
        totalAmount {
          amount
          currencyCode
        }
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;
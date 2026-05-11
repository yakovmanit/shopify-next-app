export const GET_CUSTOMER_ORDERS_QUERY = `#graphql
  query GetCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 100) {
        edges {
          node {
            name
            fulfillmentStatus
            processedAt
            totalPrice {
              amount
              currencyCode
            }
            lineItems(first: 100) {
              edges {
                node {
                  title
                  quantity
                  variant {
                    selectedOptions {
                      name
                      value
                    }
                  }
                  originalTotalPrice {
                    amount
                    currencyCode
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
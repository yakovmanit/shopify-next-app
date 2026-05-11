export const GET_CUSTOMER_ORDERS_QUERY = `#graphql
  query GetCustomerOrders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      orders(first: 100) {
        edges {
          node {
            id
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
                    id
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
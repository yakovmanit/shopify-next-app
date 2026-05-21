export const GET_CUSTOMER_ADDRESSES_QUERY = `#graphql
  query GetCustomerAddresses($first: Int!) {
    customer {
      addresses(first: $first) {
        edges {
          node {
            id
            country
            territoryCode
            firstName
            lastName
            company
            address1
            address2
            city
            province
            zip
            phoneNumber
            name
          }
        }
      }
    }
  }
`;
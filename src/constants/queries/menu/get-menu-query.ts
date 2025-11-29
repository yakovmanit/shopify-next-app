export const GET_MENU_QUERY = `#graphql
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
        resource {
          ... on Collection {
            id
            title
            handle
          }
          
          ... on Page {
            id
            title
            handle
          }
        }
        items { # Nested menu items
          id
          title
          url
          resource {
            ... on Collection {
              id
              title
              handle
            }
          }
        }
      }
    }
  }
`
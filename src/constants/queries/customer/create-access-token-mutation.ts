export const CREATE_ACCESS_TOKEN_MUTATION = `#graphql
  mutation createAccessToken($email: String!, $password: String!) {
    customerAccessTokenCreate(input: {email: $email, password: $password}) {
      customerAccessToken {
        accessToken
      }
      customerUserErrors {
        message
      }
    }
  }
`;
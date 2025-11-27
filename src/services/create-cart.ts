import {ShopifyData} from "@/lib/shopify";
import {CartCreateMutation} from "@/types/storefront/storefront.generated";

type Props = {
  lines: {
    quantity: number;
    merchandiseId: string;
  }[];
};

export async function createCart(input: Props) {
  const query = `#graphql
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          lines(first: 100) {
            edges {
              node {
                id
                quantity
              }
            }
          }
        }
        userErrors {
          field
          message
        }
        warnings {
          message
        }
      }
    }
  `;

  const variables = {
    input,
  };

  const response: CartCreateMutation = await ShopifyData(query, variables);

  return response.cartCreate?.cart;
}
import {ShopifyData} from "@/lib";
import {CREATE_ACCESS_TOKEN_MUTATION} from "@/constants/queries";
import {CreateAccessTokenMutation} from "@/types/storefront/storefront.generated";

export async function createAccessToken(email: string, password: string) {
  const variables = {
    email,
    password,
  };

  const response: CreateAccessTokenMutation = await ShopifyData(CREATE_ACCESS_TOKEN_MUTATION, variables);

  return response?.customerAccessTokenCreate?.customerAccessToken?.accessToken;
}
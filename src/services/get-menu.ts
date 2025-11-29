import {ShopifyData} from "@/lib/shopify";
import {GET_MENU_QUERY} from "@/constants/queries";
import {GetMenuQuery} from "@/types/storefront/storefront.generated";

export async function getMenu(handle: string) {
  const variables = {
    handle,
  };

  const response: GetMenuQuery = await ShopifyData(GET_MENU_QUERY, variables);

  return  response?.menu?.items;
}
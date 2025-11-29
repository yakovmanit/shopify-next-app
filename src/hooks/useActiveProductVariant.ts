import {useMemo} from "react";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";

/**
 * Hook to find the active product variant based on selected options.
 *
 * Matches the variant where all selectedOptions correspond to the user's choices.
 * For example, if a user selects Size: "M" and Color: "Red", this hook finds
 * the variant that has exactly those option values.
 *
 * @param product - The product data from Shopify
 * @param selectedOptions - Object with option names as keys and selected values as values
 *
 * @returns The matching variant node or undefined if no match found
 */

export const useActiveProductVariant = (
  product: GetProductByHandleQuery['product'],
  selectedOptions: Record<string, string>,
) => {
  return useMemo(() => {
    return product?.variants.edges.find(({node}) => {
      return node.selectedOptions.every(opt =>
        selectedOptions[opt.name] === opt.value
      );
    })?.node;
  }, [selectedOptions, product]);
}
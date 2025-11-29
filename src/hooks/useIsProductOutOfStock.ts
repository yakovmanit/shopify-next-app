import {useGetCartId} from "@/hooks/useGetCartId";
import {useGetCartQuery} from "@/redux";
import {Maybe} from "@/types/storefront/storefront.types";

/**
 * useIsProductOutOfStock
 * Checks if a product variant is out of stock by comparing available quantity
 * with the quantity already added to the cart.
 *
 * @param {string} currentVariantId - The ID of the product variant to check
 * @param {Maybe<number> | undefined} quantityAvailable - Available quantity of the variant
 *
 * @returns {boolean} True if the available quantity equals the quantity in cart (out of stock)
 */

export const useIsProductOutOfStock = (
  currentVariantId: string,
  quantityAvailable: Maybe<number> | undefined,
) => {
  const cartId = useGetCartId();

  const { data: cart } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );

  const addedProductQuantity = cart?.lines?.edges?.find(({ node }) => node.merchandise.id === currentVariantId)?.node.quantity;

  return  quantityAvailable === addedProductQuantity;
}

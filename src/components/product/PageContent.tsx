'use client';

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {Option} from "@/components/product/Option";
import {Container} from "@/components/ui";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";
import {useAddToCartMutation, useCreateCartMutation, useGetCartQuery} from "@/redux";
import {Loader} from "lucide-react";
import {useIsProductOutOfStock} from "@/hooks/useIsProductOutOfStock";
import {useActiveProductVariant} from "@/hooks/useActiveProductVariant";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setCartItemsCount} from "@/redux/slices/cartSlice";

interface Props {
  product: GetProductByHandleQuery["product"];
}

export const PageContent: React.FC<Props> = ({ product }) => {
  const dispatch = useAppDispatch();
  const cartId = useAppSelector(state => state.cart.cartId);

  const { data: currentCart } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );

  const isCartExists = !!currentCart;

  const [createCart] = useCreateCartMutation();
  const [addToCart] = useAddToCartMutation();

  const [isBuyNowLoading, setIsBuyNowLoading] = useState(false);
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);

  // State to hold selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product?.options?.forEach(option => {
      initial[option.name] = option.optionValues[0].name;
    });
    return initial;
  });

  const activeVariant = useActiveProductVariant(product, selectedOptions);

  const isNoAvailable = useIsProductOutOfStock(
    activeVariant?.id as string,
    activeVariant?.quantityAvailable as number,
  );

  const options = product?.options;

  // TODO: add hook to ADT logic. Use it here and in the ProductCard component. Separate ATC and Buy Now logic
  const handleAddToCart = async (isBuyNow?: boolean) => {
    if (!activeVariant?.id) return;

    if (isBuyNow) {
      setIsBuyNowLoading(true);
    } else {
      setIsAddToCartLoading(true);
    }

    try {
      let cart;

      // Add to the existing cart
      if (cartId && isCartExists) {
        await addToCart({
          cartId,
          lines: [{ merchandiseId: activeVariant.id, quantity: 1 }]
        });
      } else {
        // Create a new cart
        cart = await createCart({
          lines: [{ merchandiseId: activeVariant.id, quantity: 1 }]
        }).unwrap();

        if (cart?.id) {
          localStorage.clear()
          localStorage.setItem('cartId', cart.id);

          dispatch(setCartItemsCount(cart.id))
        }
      }

      if (isBuyNow && cart?.checkoutUrl) {
        window.location.href = cart.checkoutUrl;
      }

    } finally {
      setIsAddToCartLoading(false);
    }
  }

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-8 md:py-12">
        <div className="flex h-fit bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={product?.images.edges[0]?.node.url || ''}
            alt={product?.title || 'Product Image'}
            width={600}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-6 h-fit">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product?.title}</h1>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>

            {/* Variant options */}
          {
            options && options.some(option => option.optionValues.length >= 2) && (
              <div className="py-4 border-y border-gray-200">
                {options
                  .filter(option => option.optionValues.length >= 2)
                  .map(option => (
                    <Option
                      key={option.id}
                      option={option}
                      selected={selectedOptions[option.name]}
                      onSelect={(value) => setSelectedOptions(prev => ({
                        ...prev,
                        [option.name]: value
                      }))}
                    />
                  ))}
              </div>
            )
          }

          <p className="text-2xl md:text-3xl font-semibold text-gray-900">{activeVariant?.price.amount} {product?.priceRange.maxVariantPrice.currencyCode}</p>

          <div className="mt-auto">
            <button
              onClick={() => handleAddToCart(true)}
              className="cursor-pointer w-full bg-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isNoAvailable || activeVariant?.quantityAvailable === 0}
            >
              {
                isBuyNowLoading ? (
                  <Loader className="mx-auto w-6 h-6 text-white animate-spin" />
                ) : (
                  <>Buy Now</>
                )
              }
            </button>
          </div>
          <div className="mt-auto">
            <button
              onClick={() => handleAddToCart()}
              className="cursor-pointer w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isNoAvailable || activeVariant?.quantityAvailable === 0}
            >
              {
                isAddToCartLoading ? (
                  <Loader className="mx-auto w-6 h-6 text-white animate-spin" />
                ) : (
                  isNoAvailable || activeVariant?.quantityAvailable === 0 ? (
                    <>Out of Stock</>
                  ) : (
                    <>Add to Cart</>
                  )
                )
              }
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

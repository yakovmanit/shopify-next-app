'use client';

import React, {useState} from 'react';
import Link from "next/link";
import {Loader, ShoppingCartIcon} from "lucide-react";
import {useAddToCartMutation, useCreateCartMutation, useGetCartQuery} from "@/redux";
import {Maybe} from "@/types/storefront/storefront.types";
import {useIsProductOutOfStock} from "@/hooks/useIsProductOutOfStock";
import {QuickBuyPopup} from "@/components/quick-buy";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {setCartItemsCount} from "@/redux/slices/cartSlice";

interface Props {
  id: string;
  product: GetProductByHandleQuery["product"];
  title: string;
  price: number;
  image: string;
  handle: string;
  description: string;
  currencyCode: string;
  className?: string;
  variants: {
    id: string;
    title: string;
    quantityAvailable:  Maybe<number> | undefined;
  }[]
}

export const ProductCard: React.FC<Props> = ({ className, id, image, description, handle, price, title, product, currencyCode, variants }) => {
  const dispatch = useAppDispatch();
  const cartId = useAppSelector(state => state.cart.cartId);

  const [createCart] = useCreateCartMutation();

  const { data: currentCart } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );

  const isCartExists = !!currentCart;

  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false);

  const isNoAvailable = useIsProductOutOfStock(
    variants[0].id,
    variants[0].quantityAvailable,
  );

  const hasVariants = variants.length > 1;

  const [addToCart, { isLoading: isAddToCartLoading }] = useAddToCartMutation();

  const handleAddToCart = async () => {
    let cart;

    // Add to the existing cart
    if (cartId && isCartExists) {
      await addToCart({
        cartId,
        lines: [{merchandiseId: variants[0].id, quantity: 1}]
      });
    } else {
      // Create a new cart
      cart = await createCart({
        lines: [{ merchandiseId: variants[0].id, quantity: 1 }]
      }).unwrap();

      if (cart?.id) {
        localStorage.clear()
        localStorage.setItem('cartId', cart.id);

        dispatch(setCartItemsCount(cart.id))
      }
    }
  }

  return (
    <>
      <div className={className}>
        <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
          <div className="relative aspect-square overflow-hidden bg-gray-100">
            <Link href={`/product/${handle}`} className="group">
              <img
                src={image}
                alt={title}
                className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full"
              />
            </Link>
          </div>

          <div className="p-6">
            <Link href={`/product/${handle}`}>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                {title}
              </h3>
            </Link>

            <p className="text-sm text-gray-600 mb-4 line-clamp-2">
              {description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-gray-900">{price} {currencyCode}</span>

              {
                hasVariants ? (
                  <button
                    className="flex items-center gap-2 text-white bg-gray-900 py-2 px-4 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors"
                    onClick={() => setIsQuickBuyOpen(true)}
                  >
                    {/* TODO: display Out of Stock message if all variants is out of stock */}
                    Select Options
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart()}
                    className="cursor-pointer bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isNoAvailable || variants[0]?.quantityAvailable === 0}
                  >
                    {
                      isAddToCartLoading ? (
                        <Loader className="mx-auto w-6 h-6 text-white animate-spin" />
                      ) : (
                        isNoAvailable || variants[0]?.quantityAvailable === 0 ? (
                          <>Out of Stock</>
                        ) : (
                          <ShoppingCartIcon className="w-6 h-6" />
                        )
                      )
                    }
                  </button>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <QuickBuyPopup
        product={product}
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
      />
    </>
  );
};
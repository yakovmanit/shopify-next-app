'use client';

import React from 'react';
import Image from "next/image";
import {Option} from "@/components/product/Option";
import {Container} from "@/components/ui";
import {GetProductByHandleQuery} from "@/types/storefront/storefront.generated";
import {useAddToCartMutation, useCreateCartMutation} from "@/redux";

interface Props {
  product: GetProductByHandleQuery["product"];
}

export const PageContent: React.FC<Props> = ({ product }) => {
  const [quantity, setQuantity] = React.useState(1);

  const [createCart] = useCreateCartMutation();
  const [addToCart] = useAddToCartMutation();

  // State to hold selected options
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product?.options?.forEach(option => {
      initial[option.name] = option.optionValues[0].name;
    });
    return initial;
  });

  // Find the active variant
  const activeVariant = React.useMemo(() => {
    return product?.variants.edges.find(({ node }) => {
      return node.selectedOptions.every(opt =>
        selectedOptions[opt.name] === opt.value
      );
    })?.node;
  }, [selectedOptions, product]);

  const options = product?.options;

  const handleBuyNow = async () => {
    if (!activeVariant?.id) return;

    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;

    let cart;
    if (cartId) {
      cart = await addToCart({
        cartId,
        lines: [{ merchandiseId: activeVariant.id, quantity }]
      }).unwrap();
    } else {
      cart = await createCart({
        lines: [{ merchandiseId: activeVariant.id, quantity }]
      }).unwrap();

      if (cart?.id) {
        localStorage.setItem('cartId', cart.id);
      }
    }

    if (cart?.checkoutUrl) {
      window.location.href = cart.checkoutUrl;
    }
  }

  const handleAddToCart = async () => {
    if (!activeVariant?.id) return;

    const cartId = typeof window !== 'undefined' ? localStorage.getItem('cartId') : null;

    let cart;
    if (cartId) {
      // Добавить в существующую корзину
      cart = await addToCart({
        cartId,
        lines: [{ merchandiseId: activeVariant.id, quantity }]
      }).unwrap();
    } else {
      // Создать новую корзину
      cart = await createCart({
        lines: [{ merchandiseId: activeVariant.id, quantity }]
      }).unwrap();

      if (cart?.id) {
        localStorage.setItem('cartId', cart.id);
      }
    }

    console.log('Cart updated: ', cart);
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

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{product?.title}</h1>
          <p className="text-gray-600 leading-relaxed">{product?.description}</p>

            {/* Variant options */}
            {
              options && (
                <div className="py-4 border-y border-gray-200">
                  {options.map(option => (
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
              onClick={handleBuyNow}
              className="w-full bg-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              Buy Now
            </button>
          </div>
          <div className="mt-auto">
            <button
              onClick={handleAddToCart}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

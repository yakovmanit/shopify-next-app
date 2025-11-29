'use client';

import React, {useState} from 'react';
import {Loader, ShoppingBag, X} from 'lucide-react';
import {useGetCartQuery} from "@/redux";
import {CartDrawerItem} from "@/components/cart-drawer/CartDrawerItem";
import {useGetCartId} from "@/hooks";

export const CartDrawer: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartId = useGetCartId();

  const { data: cart, isFetching: isCartFetching } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );

  const cartItems = cart?.lines.edges.map(({ node }) => {
    // Find the variant based on the selected variant ID
    const currentVariant = node.merchandise.product.variants.edges.find(
      ({ node: variantNode }) => variantNode.id === node.merchandise.id
    )

    const variantPrice = currentVariant?.node.price?.amount ?? 0;

    const quantityAvailable = currentVariant?.node.quantityAvailable ?? 0;

    return {
      id: node.id,
      title: node.merchandise.product.title,
      variant: node.merchandise.title,
      price: variantPrice,
      currencyCode: currentVariant?.node.price.currencyCode ?? '',
      quantity: node.quantity,
      image: node.merchandise.product.featuredImage?.url ?? '',
      merchandiseId: node.merchandise.id,
      quantityAvailable: quantityAvailable,
    }
  }) || [];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const currencyCode = cartItems[0]?.currencyCode;

  return (
    <>
      <button className='relative cursor-pointer p-2' onClick={() => setIsCartOpen(true)}>
        <ShoppingBag />

        {
          cart?.lines.edges.length !== 0 && (
            <span className='absolute bottom-0 right-0 text-xs font-medium text-white bg-blue-400 rounded-full h-4 w-4 flex items-center justify-center'>
              {cart?.lines.edges.reduce((total, line) => total + line.node.quantity, 0)}
            </span>
          )
        }
      </button>

      {/* Overlay */}
      {
        isCartOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
              onClick={() => setIsCartOpen(false)}
            />

            {/* Sidebar */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
                  <span className="bg-blue-400 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {cartItems.length}
            </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-600 text-lg">Your cart is empty</p>
                    <p className="text-gray-400 text-sm mt-2">Add some items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartDrawerItem
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        variant={item.variant}
                        price={item.price}
                        currencyCode={item.currencyCode}
                        quantity={item.quantity}
                        image={item.image}
                        merchandiseId={item.merchandiseId}
                        quantityAvailable={item.quantityAvailable}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t border-gray-200 p-6 space-y-4">
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="h-8 text-2xl font-bold text-gray-900">
                 {isCartFetching ? (
                   <Loader className="w-6 h-6 text-blue-400 animate-spin" />
                 ) : (
                   <span className="text-2xl font-bold text-gray-900">
                    {totalPrice.toFixed(2)} {currencyCode}
                  </span>
                 )}
              </span>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    Shipping and taxes calculated at checkout
                  </p>

                  {/* Checkout Button */}
                  <button className="w-full bg-blue-400 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                    Proceed to Checkout
                  </button>

                  {/* Continue Shopping */}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              )}
            </div>
          </>
        )
      }
    </>
  );
};
'use client';

import React from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import {useGetCartQuery} from "@/redux";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [cartId] = React.useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('cartId');
    }
    return null;
  });

  const { data: cart, isLoading } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );

  console.log('cartId from localstorage: ', cartId);
  console.log('useGetCartQuery: ', cart);

  const cartItems = cart?.lines.edges.map(({ node }) => {
    // Find the variant price based on the selected variant ID
    const variantPrice = node.merchandise.product.variants.edges.find(
      ({ node: variantNode }) => variantNode.id === node.merchandise.id
    )?.node.price;

    return {
      id: node.id,
      title: node.merchandise.product.title,
      variant: node.merchandise.title,
      price: variantPrice?.amount || 0,
      currencyCode: variantPrice?.currencyCode || '',
      quantity: node.quantity,
      image: node.merchandise.product.featuredImage?.url || '',
    }
  }) || [];

  // console.log('cartItems: ', cartItems);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50 z-40 transition-opacity"
        onClick={onClose}
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
            onClick={onClose}
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
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.variant}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button className="p-1 hover:bg-white transition-colors">
                          <Minus className="w-3 h-3 text-gray-600" />
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900">
                          {item.quantity}
                        </span>
                        <button className="p-1 hover:bg-white transition-colors">
                          <Plus className="w-3 h-3 text-gray-600" />
                        </button>
                      </div>

                      <span className="font-semibold text-gray-900">
                        {item.price} {item.currencyCode}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button className="self-start p-2 hover:bg-white rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
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
              <span className="text-2xl font-bold text-gray-900">
                {cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)} {cartItems[0]?.currencyCode}
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
              onClick={onClose}
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};
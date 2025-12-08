'use client';

import React, {useState} from 'react';
import {CircleAlert, Minus, Plus, Trash2} from "lucide-react";
import Image from "next/image";
import {useCartLinesUpdateMutationMutation} from "@/redux";
import toast from "react-hot-toast";

interface Props {
  id: string;
  title: string;
  variant: string;
  price: number;
  currencyCode: string;
  quantity: number;
  image: string;
  merchandiseId: string;
  quantityAvailable: number;
}

export const CartDrawerItem: React.FC<Props> = ({ id, title, variant, price, currencyCode, quantity, image, merchandiseId, quantityAvailable }) => {
  const [quantityInCart, setQuantityInCart] = useState(quantity);

  const [ updateItemQuantity ] = useCartLinesUpdateMutationMutation();

  const handleUpdateOrDeleteLineQuantity = async (action: 1 | -1 | 0) => {
    if (action === 1 && quantityInCart === quantityAvailable) {
      toast.error('This item is out of stock!', {
        icon: <CircleAlert className="w-6 h-6 text-yellow-500" />,
      });

      return;
    }

    if (action === 0 || (action === -1 && quantityInCart === 1)) {
      await updateItemQuantity({
        cartId: localStorage.getItem('cartId') || '',
        lines: [{ id, quantity: 0, merchandiseId }]
      });

      return;
    }

    setQuantityInCart(prev => prev + action);

     await updateItemQuantity({
      cartId: localStorage.getItem('cartId') || '',
      lines: [{ id, quantity: quantityInCart + action, merchandiseId }]
    });
  }

  return (
    <div className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      {/* Product Image */}
      <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight">
            {title}
          </h3>
          <p className="text-xs text-gray-500 mt-1">{variant}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleUpdateOrDeleteLineQuantity(-1)}
              className="p-1 hover:bg-white transition-colors"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="px-3 text-sm font-medium text-gray-900">
              {quantityInCart}
            </span>
            <button
              onClick={() => handleUpdateOrDeleteLineQuantity(1)}
              className="p-1 hover:bg-white transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>

          <span className="font-semibold text-gray-900">
            {price} {currencyCode}
          </span>
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => handleUpdateOrDeleteLineQuantity(0)}
        className="self-start p-2 hover:bg-white rounded-lg transition-colors"
      >
        <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
      </button>
    </div>
  );
};

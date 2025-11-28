'use client';

import React, {useState} from 'react';
import {CartDrawer} from "@/components/cart-drawer";
import {Container} from "@/components/ui";
import {ShoppingBag} from "lucide-react";
import {useGetCartQuery} from "@/redux";
import {useGetCartId} from "@/hooks";

export const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartId = useGetCartId();

  const { data: cart } = useGetCartQuery(
    { id: cartId as string },
    { skip: !cartId }
  );


  return (
    <header className=':bg-gray-100'>
      <Container className='flex items-center justify-between py-6 px-4'>
        <button className='relative ml-auto cursor-pointer p-2' onClick={() => setIsCartOpen(true)}>
          <ShoppingBag />

            {
              cart?.lines.edges.length !== 0 && (
                <span className='absolute bottom-0 right-0 text-xs font-medium text-white bg-blue-400 rounded-full h-4 w-4 flex items-center justify-center'>
                  {cart?.lines.edges.reduce((total, line) => total + line.node.quantity, 0)}
                </span>
              )
            }
        </button>
      </Container>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
};

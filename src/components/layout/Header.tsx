'use client';

import React from 'react';
import {CartDrawer} from "@/components/cart-drawer";
import {Container} from "@/components/ui";
import {ShoppingBag} from "lucide-react";

export const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  return (
    <header className=':bg-gray-100'>
      <Container className='flex items-center justify-between py-6 px-4'>
        <button className='ml-auto cursor-pointer p-2' onClick={() => setIsCartOpen(true)}>
          <ShoppingBag />
        </button>
      </Container>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </header>
  );
};

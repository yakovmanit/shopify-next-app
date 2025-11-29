import React from 'react';
import {CartDrawer} from "@/components/cart-drawer";
import {Container} from "@/components/ui";
import {Menu} from "@/components/layout/header/Menu";
import Link from "next/link";

export const Header: React.FC = () => {
  return (
    <header className=':bg-gray-100'>
      <Container className='flex items-center justify-between py-6 px-4'>
        <div className='w-full flex items-center justify-between gap-6'>
          <h1 className='text-2xl font-bold'>
            <Link href='/'>Next Shop</Link>
          </h1>

          <Menu className='mx-auto' />

          <CartDrawer />
        </div>
      </Container>

    </header>
  );
};

import React from 'react';
import {CartDrawer} from "@/components/cart-drawer";
import {Container} from "@/components/ui";
import {Menu} from "@/components/layout/header/Menu";
import Link from "next/link";
import {getMenu} from "@/services/get-menu";

export const Header: React.FC = async () => {
  const menuItems = await getMenu('main-menu');

  return (
    <header className='bg-white border-b border-gray-200'>
      <Container className='flex items-center justify-between py-4 px-4'>
        <h1 className='text-2xl font-bold'>
          <Link href='/' className='hover:text-blue-400 transition-colors'>
            Next Shop
          </Link>
        </h1>

        <Menu
          menuItems={menuItems}
          className=''
        />

        <CartDrawer />
      </Container>
    </header>
  );
};
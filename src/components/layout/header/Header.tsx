import React from 'react';
import {CartDrawer} from "@/components/cart-drawer";
import {Container} from "@/components/ui";
import {Menu} from "@/components/layout/header/Menu";
import Link from "next/link";
import {getMenu} from "@/services";
import {Search} from "@/components/search";
import {Auth} from "@/components/auth";

export const Header: React.FC = async () => {
  const menuItems = await getMenu('main-menu');

  return (
    <header className='bg-white border-b border-gray-200'>
      <Container className='flex justify-between grid-cols-2 py-4 px-4 md:grid md:grid-cols-3'>
        <div className="hidden md:block">
          <h1 className='text-2xl font-bold'>
            <Link href='/' className='hover:text-blue-400 transition-colors'>
              Next Shop
            </Link>
          </h1>
        </div>

        <div className="flex flex-row-reverse items-center justify-end md:w-auto gap-2 md:justify-center md:gap-8">
          <Menu
            menuItems={menuItems}
            className=''
          />

          <h1 className='text-2xl font-bold md:hidden'>
            <Link href='/' className='hover:text-blue-400 transition-colors'>
              Next Shop
            </Link>
          </h1>
        </div>

        <div className="flex items-center justify-between md:w-auto">
          <Search className="ml-auto" />

          <Auth />

          <CartDrawer />
        </div>
      </Container>
    </header>
  );
};
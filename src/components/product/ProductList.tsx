import React from 'react';
import {ProductCard} from "./ProductCard";

interface Props {
  className?: string;
}

export const ProductList: React.FC<Props> = ({ className }) => {
  return (
    <div className='mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        <ProductCard />
        <ProductCard />
        <ProductCard />
    </div>
  );
};

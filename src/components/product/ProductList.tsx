import React from 'react';
import {ProductCard} from "./ProductCard";
import {Product} from "@/types/product";

interface Props {
  products?: Product[];
  className?: string;
}

export const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {
        products?.length === 0 ? (
          <p>No products found</p>
        ) : (
          products?.map(product =>
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              handle={product.handle}
              description={product.description}
              currencyCode={product.currencyCode}
            />
        )
        )
      }

    </div>
  );
};

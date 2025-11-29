import React from 'react';
import {ProductList} from "@/components/product";
import {Product} from "@/types/product";

interface Props {
  title?: string;
  products?: Product[];
  className?: string;
}

export const CollectionSection: React.FC<Props> = ({ className, title, products }) => {
  return (
    <div className={className}>
      {
        title && (
          <h1 className="text-3xl font-bold mb-12 mt-15">{title}</h1>
        )
      }

      <ProductList products={products} />
    </div>
  );
};

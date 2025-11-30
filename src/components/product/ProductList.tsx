import React from 'react';
import {ProductCard} from "./ProductCard";
import {Product} from "@/types/product";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

interface Props {
  products?: NonNullable<GetCollectionQuery['collection']>['products']['edges'];
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
              key={product.node.id}
              id={product.node.id}
              title={product.node.title}
              price={product.node.priceRange.maxVariantPrice.amount}
              image={product.node.images.edges[0].node.url}
              handle={product.node.handle}
              description={product.node.description}
              currencyCode={product.node.priceRange.maxVariantPrice.currencyCode}
              variants={product.node.variants.edges.map(variant => ({
                id: variant.node.id,
                title: variant.node.title,
                quantityAvailable: variant.node.quantityAvailable,
              }))}
            />
          )
        )
      }

    </div>
  );
};

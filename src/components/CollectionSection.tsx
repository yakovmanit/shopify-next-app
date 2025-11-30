'use client';

import React from 'react';
import {ProductList} from "@/components/product";
import {Product} from "@/types/product";
import {useGetProductsByCategoryInfiniteQuery} from "@/redux";

interface Props {
  title?: string;
  handle: string;
  // products?: Product[];
  className?: string;
}

// export const CollectionSection: React.FC<Props> = ({ className, title, products }) => {
export const CollectionSection: React.FC<Props> = ({ className, title, handle }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetProductsByCategoryInfiniteQuery({ handle, first: 3 });

  const products = data?.pages.flatMap(page => page.edges) ?? [];

  return (
    <div className={className}>
      {
        title && (
          <h1 className="text-3xl font-bold mb-12 mt-15">{title}</h1>
        )
      }

      <ProductList products={products} />

      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
};

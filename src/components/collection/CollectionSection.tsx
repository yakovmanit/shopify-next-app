'use client';

import React from 'react';
import {ProductList} from "@/components/product";
import {useGetProductsByCategoryInfiniteQuery} from "@/redux";
import {useInfiniteScroll} from "@/hooks";
import {Loader} from "lucide-react";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

interface Props {
  title?: string;
  handle?: string;
  initialData: NonNullable<GetCollectionQuery['collection']>['products']['edges'];
  selectedTypes?: string[];
  className?: string;
}

export const CollectionSection: React.FC<Props> = ({ className, title, handle, initialData, selectedTypes }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetProductsByCategoryInfiniteQuery({ handle: handle ?? '', first: 3, selectedTypes }, {
    skip: !initialData || !handle,
  });

  const { observerTarget } = useInfiniteScroll({
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
    fetchNextPage,
    rootMargin: '200px',
  });

  const products = data
    ? data.pages.flatMap(page => page.edges)
    : initialData ?? [];

  return (
    <div className={className}>
      {
        title && (
          <h1 className="text-3xl font-bold mb-12 mt-15">{title}</h1>
        )
      }

      <ProductList products={products} />

      {/* Trigger for infinite scroll to load more products */}
      {hasNextPage && (
        <div
          ref={observerTarget}
          className="h-20 flex items-center justify-center"
        >
          {isFetchingNextPage && (
            <div className="flex items-center">
              <Loader className="w-6 h-6 mr-2 animate-spin" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

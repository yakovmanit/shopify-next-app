'use client';

import React, {useState} from 'react';
import {Filters} from "@/components/filters";
import {CollectionSection} from "@/components/collection/CollectionSection";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

interface Props {
  handle: string;
  collection: NonNullable<GetCollectionQuery['collection']>;
  productTypes: string[];
  maxPrice: number;
  className?: string;
}

export const CollectionPage: React.FC<Props> = ({ handle, collection, productTypes, maxPrice }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [isProductAvailable, setIsProductAvailable] = useState(false);

  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);

  return (
    <div className="flex gap-8">
      <Filters
        setSelectedTypes={setSelectedTypes}
        selectedTypes={selectedTypes}
        productTypes={productTypes}
        isProductAvailable={isProductAvailable}
        setIsProductAvailable={setIsProductAvailable}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        maxPrice={maxPrice}
      />

      <CollectionSection
        title={collection.title}
        initialData={collection.products.edges}
        handle={handle}
        selectedTypes={selectedTypes}
        isProductAvailable={isProductAvailable}
        priceRange={priceRange}
        className="w-full"
      />
    </div>
  );
};

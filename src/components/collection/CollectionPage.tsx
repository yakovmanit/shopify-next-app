'use client';

import React, {useState} from 'react';
import {Filters} from "@/components/filters";
import {CollectionSection} from "@/components/collection/CollectionSection";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

interface Props {
  handle: string;
  collection: NonNullable<GetCollectionQuery['collection']>;
  productTypes: string[];
  className?: string;
}

export const CollectionPage: React.FC<Props> = ({ handle, collection, productTypes }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const [isProductAvailable, setIsProductAvailable] = useState(true);

  return (
    <div className="flex gap-8">
      <Filters
        setSelectedTypes={setSelectedTypes}
        selectedTypes={selectedTypes}
        productTypes={productTypes}
        isProductAvailable={isProductAvailable}
        setIsProductAvailable={setIsProductAvailable}
      />

      <CollectionSection
        title={collection.title}
        initialData={collection.products.edges}
        handle={handle}
        selectedTypes={selectedTypes}
        isProductAvailable={isProductAvailable}
        className="w-full"
      />
    </div>
  );
};

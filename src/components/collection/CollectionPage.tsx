'use client';

import React, {useState} from 'react';
import {Filters} from "@/components/filters";
import {CollectionSection} from "@/components/collection/CollectionSection";
import {GetCollectionQuery} from "@/types/storefront/storefront.generated";

interface Props {
  handle: string;
  collection: NonNullable<GetCollectionQuery['collection']>;
  productTypes: string[];
  availabilityOptions: string[];
  className?: string;
}

export const CollectionPage: React.FC<Props> = ({ handle, collection, productTypes, availabilityOptions }) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);

  return (
    <div className="flex gap-8">
      <Filters
        setSelectedTypes={setSelectedTypes}
        selectedTypes={selectedTypes}
        selectedAvailability={selectedAvailability}
        setSelectedAvailability={setSelectedAvailability}
        productTypes={productTypes}
        availabilityOptions={availabilityOptions}
      />

      <CollectionSection
        title={collection.title}
        initialData={collection.products.edges}
        handle={handle}
        selectedTypes={selectedTypes}
        className="w-full"
      />
    </div>
  );
};

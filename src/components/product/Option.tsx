'use client';

import React from 'react';
import {ProductOption} from "@/types/product";

interface Props {
  option: ProductOption;
  selected: string;
  onSelect: (value: string) => void;
  className?: string;
}

export const Option: React.FC<Props> = ({ option, selected, onSelect }) => {
  return (
    <div className='mb-6 last:mb-0'>
      <span className="text-gray-600 font-semibold text-lg">{option.name}:</span>
      <div className="flex items-center gap-4 mt-2 flex-wrap">
        {option.optionValues.map(optionValue => (
          <button
            key={optionValue.id}
            onClick={() => onSelect(optionValue.name)}
            className={`rounded-md px-4 font-semibold py-2 border border-gray-300 text-gray-600 hover:bg-gray-300 transition-colors ${selected === optionValue.name ? 'bg-gray-200' : ''}`}>
            {optionValue.name}
          </button>
        ))}
      </div>
    </div>
  );
};
'use client';

import React, {Dispatch, SetStateAction, useState} from 'react';
import { ChevronDown } from 'lucide-react';

type OpenSections = {
  type: boolean;
  availability: boolean;
};

interface Props {
  setSelectedTypes: Dispatch<SetStateAction<string[]>>;
  selectedTypes: string[];
  productTypes: string[];
  isProductAvailable: boolean;
  setIsProductAvailable: Dispatch<SetStateAction<boolean>>;
}

export const Filters: React.FC<Props> = ({
  selectedTypes,
  setSelectedTypes,
  productTypes,
  isProductAvailable,
  setIsProductAvailable,
}) => {
  const [openSections, setOpenSections] = useState<OpenSections>({
    type: true,
    availability: true
  });

  const toggleSection = (section: keyof OpenSections): void => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleTypeChange = (type: string): void => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const clearAll = (): void => {
    setSelectedTypes([]);
    setIsProductAvailable(false)
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-100 p-6 mt-12 h-fit">
      <div className="flex items-center justify-between">
        {selectedTypes.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-blue-400 hover:text-blue-600 font-medium transition-colors mb-6"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Product Type */}
      <div className="border-b border-gray-200 pb-6 mb-6">
        <button
          onClick={() => toggleSection('type')}
          className="w-full flex items-center justify-between py-2 text-left"
        >
          <span className="font-bold text-gray-900">Product Type</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${
              openSections.type ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.type && (
          <div className="mt-4 space-y-3">
            {productTypes?.map(type => (
              <label
                key={type}
                className="flex items-center cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeChange(type)}
                  className="w-4 h-4 text-blue-400 border-gray-300 rounded focus:ring-blue-400"
                />
                <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {type}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button
          onClick={() => toggleSection('availability')}
          className="w-full flex items-center justify-between py-2 text-left"
        >
          <span className="font-bold text-gray-900">Availability</span>
          <ChevronDown
            className={`w-5 h-5 text-gray-600 transition-transform ${
              openSections.availability ? 'rotate-180' : ''
            }`}
          />
        </button>

        {openSections.availability && (
          <div className="mt-4 space-y-3">
            <label
              className="flex items-center cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={isProductAvailable}
                onChange={() => setIsProductAvailable(prev => !prev)}
                className="w-4 h-4 text-blue-400 border-gray-300 rounded focus:ring-blue-400"
              />
              <span className="ml-3 text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                In Stock
              </span>
            </label>
          </div>
        )}
      </div>

      {/* Selected Filters */}
      {(selectedTypes.length > 0 || isProductAvailable) && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-xs font-medium text-gray-600 mb-3">Selected filters:</div>
          <div className="flex flex-wrap gap-2">
            {selectedTypes.map(type => (
              <span
                key={type}
                onClick={() => handleTypeChange(type)}
                className="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                {type}
                <button
                  className="cursor-pointer ml-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  ×
                </button>
              </span>
            ))}
            {isProductAvailable && (
              <span
                onClick={() => setIsProductAvailable(false)}
                className="cursor-pointer inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors"
              >
                In Stock
                <button
                  className="cursor-pointer ml-2 text-gray-500 hover:text-gray-900 transition-colors"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
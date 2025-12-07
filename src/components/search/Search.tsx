'use client';

import React, {useState} from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import Link from "next/link";
import {useLazyGetSearchResultsQuery} from "@/redux";
import {useDebouncedCallback} from "use-debounce";
import Image from "next/image";

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [getSearchData, {isFetching, data: searchData}] = useLazyGetSearchResultsQuery()

  const debouncedSearch = useDebouncedCallback((value: string) => {
      if (value.length >= 2) {
        getSearchData({ query: value });
      }
    }, 300
  );

  const handleClose = () => {
    setIsOpen(false);
    setSearchValue('');
  };

  const hasResults = searchData && (
    (searchData.products && searchData.products.length > 0) ||
    (searchData.collections && searchData.collections.length > 0)
  );

  const showNoResults = searchValue.length >= 2 && !isFetching && searchData && !hasResults;

  // TODO: split the file to components
  return (
    <div className={className}>
      {/* Search button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-2 py-2 text-gray-700 hover:text-gray-900 transition-colors cursor-pointer hover:bg-gray-100 rounded-lg"
        aria-label="Open search"
      >
        <SearchIcon className="w-6 h-6" />
      </button>

      {/* Search modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white"
          onClick={handleClose}
        >
          <div
            className="h-full overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
              {/* Header with search */}
              <div className="py-4 sm:py-6 md:py-8 border-b border-gray-200">
                <div className="flex items-center gap-2 sm:gap-3">
                  <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="flex-1 outline-none text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-gray-900 placeholder:text-gray-400"
                    autoFocus
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                      debouncedSearch(e.target.value);
                    }}
                    value={searchValue}
                  />
                  <button
                    onClick={handleClose}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Search results */}
              <div className="py-6 sm:py-8 md:py-12">
                {/* Loading skeletons */}
                {isFetching && searchValue.length >= 2 && (
                  <div>
                    {/* Products skeleton */}
                    <div className="mb-8 sm:mb-12">
                      <div className="h-6 w-24 bg-gray-200 rounded mb-4 sm:mb-6 animate-pulse"></div>
                      <div className="space-y-3 sm:space-y-4">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg"
                          >
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0 animate-pulse"></div>
                            <div className="flex-1 min-w-0">
                              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                            </div>
                            <div className="h-5 w-20 bg-gray-200 rounded flex-shrink-0 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Collection skeleton */}
                    <div>
                      <div className="h-6 w-28 bg-gray-200 rounded mb-4 sm:mb-6 animate-pulse"></div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {[1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="p-4 sm:p-6 bg-gray-50 rounded-lg"
                          >
                            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* No result message */}
                {showNoResults && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                      <SearchIcon className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No results found
                    </h3>
                    <p className="text-gray-600">
                      We couldn&#39;t find any products or collections matching &quot;{searchValue}&quot;
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      Try different keywords or check your spelling
                    </p>
                  </div>
                )}

                {/* Products section */}
                {!isFetching && searchData?.products && searchData.products.length > 0 && (
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                      Products
                    </h2>
                    <div className="space-y-3 sm:space-y-4">
                      {searchData.products.slice(0, 5).map((product) => (
                        <Link
                          href={`/product/${product.handle}`}
                          onClick={handleClose}
                          key={product.handle}
                          className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          {product.featuredImage?.url ? (
                            <Image
                              width={200}
                              height={200}
                              src={product.featuredImage.url}
                              alt={product.featuredImage.altText || product.title}
                              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg flex-shrink-0 object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">
                              {product.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">
                              {
                                product.collections.edges
                                  .map((collection) => collection.node.title)
                                  .join(', ') || 'Uncategorized'
                              }
                            </p>
                          </div>
                          <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">
                            {product.priceRange.maxVariantPrice.amount} {product.priceRange.maxVariantPrice.currencyCode}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collections section */}
                {!isFetching && searchData?.collections && searchData.collections.length > 0 && (
                  <div className="mb-8 sm:mb-12">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                      Collections
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {searchData.collections.map((collection) => (
                        <Link
                          href={`/collection/${collection.handle}`}
                          onClick={handleClose}
                          key={collection.handle}
                          className="group cursor-pointer p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                            {collection.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600">
                            {collection.products.edges.length} products
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
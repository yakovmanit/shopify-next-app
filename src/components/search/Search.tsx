'use client';

import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={className}>
      {/* Search button */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
        aria-label="Open search"
      >
        <SearchIcon className="w-5 h-5" />
      </button>

      {/* Search modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white"
          onClick={() => setIsOpen(false)}
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
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 sm:p-2 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100 flex-shrink-0"
                    aria-label="Close search"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Search results */}
              <div className="py-6 sm:py-8 md:py-12">
                {/* Products section */}
                <div className="mb-8 sm:mb-12">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    Products
                  </h2>
                  <div className="space-y-3 sm:space-y-4">
                    {/* Product 1 */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">Product Name</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">Category</p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">$19.99</p>
                    </div>

                    {/* Product 2 */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">Another Product</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">Category</p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">$24.99</p>
                    </div>

                    {/* Product 3 */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">Third Product</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">Category</p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">$32.99</p>
                    </div>

                    {/* Product 4 */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">Fourth Product</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">Category</p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">$29.99</p>
                    </div>

                    {/* Product 5 */}
                    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 mb-0.5 sm:mb-1 truncate">Fifth Product</h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">Category</p>
                      </div>
                      <p className="text-base sm:text-lg font-semibold text-gray-900 flex-shrink-0">$34.99</p>
                    </div>
                  </div>
                </div>

                {/* Collections section */}
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">
                    Collections
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {/* Collection 1 */}
                    <div className="group cursor-pointer p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Summer Collection</h3>
                      <p className="text-xs sm:text-sm text-gray-600">24 products</p>
                    </div>

                    {/* Collection 2 */}
                    <div className="group cursor-pointer p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">New Arrivals 2024</h3>
                      <p className="text-xs sm:text-sm text-gray-600">18 products</p>
                    </div>

                    {/* Collection 3 */}
                    <div className="group cursor-pointer p-4 sm:p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">Winter Collection</h3>
                      <p className="text-xs sm:text-sm text-gray-600">32 products</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
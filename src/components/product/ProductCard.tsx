import React from 'react';
import Link from "next/link";

interface Props {
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Link href={`/product/1`} className="group">
            <img
              src={'https://cdn.omlet.com/images/originals/breed_abyssinian_cat.jpg'}
              alt={'alttext'}
              className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full"
            />
          </Link>
        </div>

        <div className="p-6">
          <Link href={`/product/1`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
               Product Title
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            Dropuct description
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">199 UAH</span>
            <span className="text-sm text-blue-600 font-medium group-hover:underline">View Details →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

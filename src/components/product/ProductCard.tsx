import React from 'react';
import Link from "next/link";

interface Props {
  id: string;
  title: string;
  price: number;
  image: string;
  handle: string;
  description: string;
  currencyCode: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ className, id, image, description, handle, price, title, currencyCode }) => {
  return (
    <div className={className}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Link href={`/product/${handle}`} className="group">
            <img
              src={image}
              alt={title}
              className="object-cover group-hover:scale-105 transition-transform duration-300 h-full w-full"
            />
          </Link>
        </div>

        <div className="p-6">
          <Link href={`/product/${handle}`}>
            <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{price} {currencyCode}</span>
            <span className="text-sm text-blue-600 font-medium group-hover:underline">View Details →</span>
          </div>
        </div>
      </div>
    </div>
  );
};

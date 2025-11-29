import React from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import {GetMenuQuery} from "@/types/storefront/storefront.generated";

interface Props {
  className?: string;
  menuItems?: NonNullable<GetMenuQuery['menu']>['items'];
}

export const Menu: React.FC<Props> = ({ className, menuItems }) => {
  return (
    <nav className={className}>
      <ul className="flex items-center gap-8">
        {menuItems && menuItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.items.length > 0 ? (
              <>
                <button className="flex items-center gap-1 text-gray-700 hover:text-blue-400 font-medium transition-colors py-2">
                  {item.title}
                  <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Submenu */}
                <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  {item.items.map((subItem) => (
                    <li key={subItem.id}>
                      <Link
                        href={`/category/${subItem.resource?.handle || ''}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-400 transition-colors"
                      >
                        {subItem.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Link
                href={`/${item.resource?.handle || ''}`}
                className="text-gray-700 hover:text-blue-400 font-medium transition-colors py-2 block"
              >
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};
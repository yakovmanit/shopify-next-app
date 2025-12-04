'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Menu as MenuIcon, X } from 'lucide-react';
import {GetMenuQuery} from "@/types/storefront/storefront.generated";

interface Props {
  className?: string;
  menuItems?: NonNullable<GetMenuQuery['menu']>['items'];
}

export const Menu: React.FC<Props> = ({ className, menuItems }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenuId, setOpenSubmenuId] = useState<string | null>(null);

  const toggleSubmenu = (id: string) => {
    setOpenSubmenuId(openSubmenuId === id ? null : id);
  };

  return (
    <>
      {/* Desktop Menu */}
      <nav className={`hidden md:block ${className}`}>
        <ul className="flex items-center gap-8 justify-center">
          {menuItems && menuItems.map((item) => (
            <li key={item.id} className="relative group">
              {item.items.length > 0 ? (
                <>
                  <button className="flex items-center gap-1 text-gray-700 hover:text-blue-400 font-medium transition-colors py-2">
                    {item.title}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>

                  <ul className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-lg py-2 min-w-[200px] z-50 border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {item.items.map((subItem) => (
                      <li key={subItem.id}>
                        <Link
                          href={`/collection/${subItem.resource?.handle || ''}`}
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

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden md:order-0 order-last p-2 text-gray-700 hover:text-blue-400 transition-colors"
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Mobile Menu Sidebar */}
          <nav className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <ul className="space-y-2">
                {menuItems && menuItems.map((item) => (
                  <li key={item.id}>
                    {item.items.length > 0 ? (
                      <div>
                        <button
                          onClick={() => toggleSubmenu(item.id)}
                          className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                        >
                          {item.title}
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              openSubmenuId === item.id ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        {openSubmenuId === item.id && (
                          <ul className="mt-2 ml-4 space-y-1">
                            {item.items.map((subItem) => (
                              <li key={subItem.id}>
                                <Link
                                  href={`/collection/${subItem.resource?.handle || ''}`}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className="block px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-400 rounded-lg transition-colors"
                                >
                                  {subItem.title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={`/${item.resource?.handle || ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
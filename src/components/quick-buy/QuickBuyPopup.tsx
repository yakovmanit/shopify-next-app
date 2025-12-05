'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { PageContent } from "@/components/product/PageContent";
import { GetProductByHandleQuery } from "@/types/storefront/storefront.generated";

interface Props {
  product: GetProductByHandleQuery["product"];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export const QuickBuyPopup: React.FC<Props> = ({
  className,
  product,
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
      />

      {/* Modal */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className={`relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto ${className || ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="sticky top-4 right-4 float-right z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-6">
            <PageContent product={product} />
          </div>
        </div>
      </div>
    </>
  );
};
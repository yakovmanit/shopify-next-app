'use client';

import React, { useEffect, useState } from 'react';
import { X, Plus, Pencil, Trash2 } from 'lucide-react';

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

const MOCK_ADDRESSES: Address[] = [
  {
    id: '1',
    firstName: 'Yakiv',
    lastName: 'Manitskiy',
    company: 'PETS Inc.',
    address1: '123 Main Street',
    address2: 'Apt 4B',
    city: 'Kyiv',
    province: 'Kyiv Oblast',
    zip: '01001',
    country: 'Ukraine',
    phone: '+380 50 123 4567',
    isDefault: true,
  },
  {
    id: '2',
    firstName: 'Yakiv',
    lastName: 'Manitskiy',
    address1: '456 Office Park',
    city: 'Lviv',
    province: 'Lviv Oblast',
    zip: '79000',
    country: 'Ukraine',
    phone: '+380 67 765 4321',
  },
];

export const AddressesPageContent = () => {
  const [addresses] = useState<Address[]>(MOCK_ADDRESSES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const openAddModal = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
  };

  const openEditModal = (address: Address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAddress(null);
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600">
          {addresses.length > 0
            ? `You have ${addresses.length} saved ${addresses.length === 1 ? 'address' : 'addresses'}.`
            : 'You don’t have any saved addresses yet.'}
        </p>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Add address
        </button>
      </div>

      {addresses.length === 0 ? (
        <div className="border border-dashed border-gray-300 rounded-lg p-10 text-center text-gray-500">
          No addresses yet. Click <span className="font-medium">Add address</span> to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="border border-gray-200 rounded-lg p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold">
                    {address.firstName} {address.lastName}
                  </p>
                  {address.isDefault && (
                    <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                      Default
                    </span>
                  )}
                </div>

                <div className="text-sm text-gray-600 space-y-0.5">
                  {address.company && <p>{address.company}</p>}
                  <p>{address.address1}</p>
                  {address.address2 && <p>{address.address2}</p>}
                  <p>
                    {address.city}, {address.province} {address.zip}
                  </p>
                  <p>{address.country}</p>
                  {address.phone && <p className="pt-1">{address.phone}</p>}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={() => openEditModal(address)}
                  className="inline-flex items-center gap-1 text-sm border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-50 transition cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-sm border border-gray-300 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddressFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        address={editingAddress}
      />
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: Address | null;
}

const AddressFormModal: React.FC<ModalProps> = ({ isOpen, onClose, address }) => {
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

  const title = address ? 'Edit address' : 'Add new address';

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" />

      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="relative bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6">
            <h2 className="text-xl font-semibold mb-6">{title}</h2>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="First name"
                  name="firstName"
                  defaultValue={address?.firstName}
                  required
                />
                <Field
                  label="Last name"
                  name="lastName"
                  defaultValue={address?.lastName}
                  required
                />
              </div>

              <Field
                label="Company (optional)"
                name="company"
                defaultValue={address?.company}
              />

              <Field
                label="Address line 1"
                name="address1"
                defaultValue={address?.address1}
                required
              />

              <Field
                label="Address line 2 (optional)"
                name="address2"
                defaultValue={address?.address2}
              />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field
                  label="City"
                  name="city"
                  defaultValue={address?.city}
                  required
                />
                <Field
                  label="State / Province"
                  name="province"
                  defaultValue={address?.province}
                  required
                />
                <Field
                  label="ZIP / Postal code"
                  name="zip"
                  defaultValue={address?.zip}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Country"
                  name="country"
                  defaultValue={address?.country}
                  required
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  defaultValue={address?.phone}
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-700 pt-1">
                <input
                  type="checkbox"
                  defaultChecked={address?.isDefault}
                  className="rounded border-gray-300"
                />
                Set as default address
              </label>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition cursor-pointer"
                >
                  {address ? 'Save changes' : 'Add address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({ label, name, type = 'text', defaultValue, required }) => {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
    </label>
  );
};

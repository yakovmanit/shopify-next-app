'use client';

import React, { useState } from 'react';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string;
}

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  itemsCount: number;
  items: OrderItem[];
}

interface Props {
  className?: string;
}

export const OrdersPageContent: React.FC<Props> = ({ className }) => {
  const orders: Order[] = [
    {
      id: "1001",
      date: "2025-01-05",
      total: "$129.99",
      status: "Delivered",
      itemsCount: 3,
      items: [
        { id: "i1", name: "Wireless Headphones", quantity: 1, price: "$79.99" },
        { id: "i2", name: "USB-C Cable", quantity: 1, price: "$9.99" },
        { id: "i3", name: "Phone Case", quantity: 1, price: "$40.01" },
      ],
    },
    {
      id: "1002",
      date: "2025-02-10",
      total: "$89.50",
      status: "Processing",
      itemsCount: 1,
      items: [
        { id: "i4", name: "Mechanical Keyboard", quantity: 1, price: "$89.50" },
      ],
    },
    {
      id: "1003",
      date: "2025-03-02",
      total: "$249.00",
      status: "Shipped",
      itemsCount: 5,
      items: [
        { id: "i5", name: "Office Chair Cushion", quantity: 1, price: "$49.00" },
        { id: "i6", name: "Desk Lamp", quantity: 2, price: "$60.00" },
        { id: "i7", name: "Notebook A5", quantity: 2, price: "$40.00" },
      ],
    },
  ];

  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  const toggleOrder = (orderId: string) => {
    setExpandedOrderId((prev) => (prev === orderId ? null : orderId));
  };

  const hasOrders = orders.length > 0;

  return (
    <div className="mt-4 w-full">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      {!hasOrders && (
        <p className="text-gray-600">You don&apos;t have any orders yet.</p>
      )}

      {hasOrders && (
        <div className="space-y-4">
          {orders.map((order) => {
            const isExpanded = expandedOrderId === order.id;

            return (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleOrder(order.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-4 hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-lg">Order #{order.id}</p>
                      <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{order.total}</p>
                      <p className="text-sm text-gray-500">{order.itemsCount} items</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`inline-block text-sm px-3 py-1 rounded-full
                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.status}
                    </span>

                    <span
                      className={`text-gray-400 text-sm transition-transform ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    >
                      ▼
                    </span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="border-t border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">Items</p>
                    <ul className="divide-y divide-gray-200">
                      {order.items.map((item) => (
                        <li
                          key={item.id}
                          className="flex justify-between py-2 text-sm"
                        >
                          <span className="text-gray-800">
                            {item.name}
                            <span className="text-gray-500"> × {item.quantity}</span>
                          </span>
                          <span className="text-gray-700">{item.price}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

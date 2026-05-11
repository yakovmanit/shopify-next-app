'use client';

import { useState } from 'react';

import React from 'react';
import {GetCustomerOrdersQuery} from "@/types/storefront/storefront.generated";

interface Props {
  orders: NonNullable<GetCustomerOrdersQuery['customer']>['orders']['edges'];
}

export const OrdersPageContent: React.FC<Props> = ({ orders }) => {
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
            const isExpanded = expandedOrderId === order.node.id;

            return (
              <div
                key={order.node.id}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleOrder(order.node.id)}
                  aria-expanded={isExpanded}
                  className="w-full text-left p-4 hover:bg-gray-50 transition cursor-pointer"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-lg">Order {order.node.name}</p>
                      <p className="text-sm text-gray-500">Placed on {order.node.processedAt}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold">{order.node.totalPrice.amount} {order.node.totalPrice.currencyCode}</p>
                      <p className="text-sm text-gray-500">{orders.length} items</p>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span
                      className={`inline-block text-sm px-3 py-1 rounded-full
                        ${
                          order.node.fulfillmentStatus === "FULFILLED"
                            ? "bg-green-100 text-green-600"
                            : order.node.fulfillmentStatus === "IN_PROGRESS"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {order.node.fulfillmentStatus}
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
                      {order.node.lineItems.edges.map((product) => (
                        <li
                          key={product.node.variant?.id}
                          className="flex justify-between py-2 text-sm"
                        >
                          <span className="text-gray-800">
                            {product.node.title}
                            <span className="text-gray-500"> × {product.node.quantity}</span>
                          </span>
                          <span className="text-gray-700">{product.node.originalTotalPrice.amount} {product.node.originalTotalPrice.currencyCode}</span>
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

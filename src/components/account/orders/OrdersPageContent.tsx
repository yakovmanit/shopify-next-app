import React from 'react';

interface Props {
  className?: string;
}

export const OrdersPageContent: React.FC<Props> = ({ className }) => {
  const orders = [
    {
      id: "1001",
      date: "2025-01-05",
      total: "$129.99",
      status: "Delivered",
      itemsCount: 3,
    },
    {
      id: "1002",
      date: "2025-02-10",
      total: "$89.50",
      status: "Processing",
      itemsCount: 1,
    },
    {
      id: "1003",
      date: "2025-03-02",
      total: "$249.00",
      status: "Shipped",
      itemsCount: 5,
    },
  ];

  const hasOrders = orders.length > 0;

  return (
    <div className="mt-4 w-full">
      <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

      {!hasOrders && (
        <p className="text-gray-600">You don&apos;t have any orders yet.</p>
      )}

      {hasOrders && (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition"
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

              <div className="mt-2">
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
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

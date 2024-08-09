// src/pages/MyOrders.jsx
import React from 'react';

const orders = {
  processing: [
    { id: 1, item: 'Laptop', date: '2024-08-01' },
    { id: 2, item: 'Smartphone', date: '2024-08-05' },
  ],
  cancelled: [
    { id: 3, item: 'Headphones', date: '2024-08-02' },
  ],
  completed: [
    { id: 4, item: 'Keyboard', date: '2024-07-28' },
    { id: 5, item: 'Mouse', date: '2024-07-30' },
  ],
};

const OrderSection = ({ title, orders }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <ul className="list-disc pl-5">
      {orders.length > 0 ? (
        orders.map((order) => (
          <li key={order.id} className="mb-2">
            <div className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow-sm">
              <span className="font-medium">{order.item}</span>
              <span className="text-gray-500">{order.date}</span>
            </div>
          </li>
        ))
      ) : (
        <li>No orders found</li>
      )}
    </ul>
  </div>
);

const MyOrders = () => (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-8">My Orders</h1>
    <OrderSection title="Processing Orders" orders={orders.processing} />
    <OrderSection title="Cancelled Orders" orders={orders.cancelled} />
    <OrderSection title="Completed Orders" orders={orders.completed} />
  </div>
);

export default MyOrders;

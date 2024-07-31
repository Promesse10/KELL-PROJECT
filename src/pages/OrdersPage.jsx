import React from 'react';
import OrderList from '../components/Orders/OrderList';

const OrdersPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <OrderList />
    </div>
  );
};

export default OrdersPage;

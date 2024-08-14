import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 text-lg text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Orders</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 border rounded-lg shadow-md bg-white hover:bg-gray-100 transition-colors"
          >
            <p className="text-lg font-medium">Order ID: {order.id}</p>
            <p className="text-sm text-gray-700">Total: ${order.total}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

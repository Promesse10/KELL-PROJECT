import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../../redux/slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="mb-2">
            Order ID: {order.id} - Total: ${order.total}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;

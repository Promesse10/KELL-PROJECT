import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../../slices/orderSlice';

const OrderList = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleEditClick = (orderId, currentStatus) => {
    setEditingOrderId(orderId);
    setNewStatus(currentStatus);
  };

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleSaveStatus = (orderId) => {
    dispatch(updateOrderStatus({ orderId, status: newStatus }));
    setEditingOrderId(null);
    dispatch(getAllOrders());
  };

  if (status === 'loading') {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 text-lg text-red-600">Error: {error}</div>;
  }

  // Sort orders by createdAt date, newest first
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="p-4 max-w-screen-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-950 text-center">Orders</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-950 text-white">
            <tr>
              <th className="py-3 px-4 border-b">Order DATE</th>
              <th className="py-3 px-4 border-b">User</th>
              <th className="py-3 px-4 border-b">Shipping Info</th>
              <th className="py-3 px-4 border-b">Payment Method</th>
              <th className="py-3 px-4 border-b">Order Status</th>
              <th className="py-3 px-4 border-b">Items</th>
              <th className="py-3 px-4 border-b">Total</th>
              <th className="py-3 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100 transition-colors">
                <td className="py-4 px-4 border-b whitespace-nowrap text-center">
                  {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                </td>
                <td className="py-4 px-4 border-b text-center">
                  {order.user ? order.user.name : 'Unknown User'}
                </td>
                <td className="py-3 px-2 sm:px-4 border-b text-center whitespace-nowrap">
                  {order.shippingInfo.address}, {order.shippingInfo.city}
                </td>
                <td className="py-3 px-2 sm:px-4 border-b text-center">{order.paymentMethod}</td>
                <td className="py-3 px-2 sm:px-4 border-b text-center">
                  {editingOrderId === order._id ? (
                    <select
                      value={newStatus}
                      onChange={handleStatusChange}
                      className="border rounded p-1 sm:p-2"
                    >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="canceled">Canceled</option>
                    </select>
                  ) : (
                    order.orderStatus
                  )}
                </td>
                <td className="py-3 px-2 sm:px-4 border-b text-center">
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-gray-50 rounded">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="py-1 px-2 border-b text-xs sm:text-sm">Name</th>
                          <th className="py-1 px-2 border-b text-xs sm:text-sm">Quantity</th>
                          <th className="py-1 px-2 border-b text-xs sm:text-sm">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.orderItems.map((item) => (
                          <tr key={item._id}>
                            <td className="py-1 px-2 border-b text-xs sm:text-sm">{item.name}</td>
                            <td className="py-1 px-2 border-b text-xs sm:text-sm text-center">{item.quantity}</td>
                            <td className="py-1 px-2 border-b text-xs sm:text-sm text-center">RF:{item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </td>
                <td className="py-3 px-2 sm:px-4 border-b whitespace-nowrap text-center">RF:{order.itemPrice}</td>
                <td className="py-3 px-2 sm:px-4 border-b text-center">
                  {editingOrderId === order._id ? (
                    <button
                      onClick={() => handleSaveStatus(order._id)}
                      className="bg-green-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-green-600 text-xs sm:text-sm"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(order._id, order.orderStatus)}
                      className="bg-blue-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded hover:bg-blue-600 text-xs sm:text-sm"
                    >
                      Edit Status
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;

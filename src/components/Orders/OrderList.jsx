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
  };

  if (status === 'loading') {
    return <div className="p-4 text-lg">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="p-4 text-lg text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4 max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Orders</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User</th>
            <th className="py-2 px-4 border-b">Shipping Info</th>
            <th className="py-2 px-4 border-b">Payment Method</th>
            <th className="py-2 px-4 border-b">Order Status</th>
            <th className="py-2 px-4 border-b">Items</th>
            <th className="py-2 px-4 border-b">Total</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="hover:bg-gray-100 transition-colors">
              <td className="py-2 px-4 border-b">{order._id}</td>
              <td className="py-2 px-4 border-b">{order.user ? order.user.name : 'Unknown User'}</td>
              <td className="py-2 px-4 border-b">
                {order.shippingInfo.address}, {order.shippingInfo.city}
              </td>
              <td className="py-2 px-4 border-b">{order.paymentMethod}</td>
              <td className="py-2 px-4 border-b">
                {editingOrderId === order._id ? (
                  <select value={newStatus} onChange={handleStatusChange}>
                    <option value="Pending">Pending</option>
                    <option value="Processed">Processed</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                ) : (
                  order.orderStatus
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="py-1 px-2 border-b">Image</th>
                      <th className="py-1 px-2 border-b">Name</th>
                      <th className="py-1 px-2 border-b">Quantity</th>
                      <th className="py-1 px-2 border-b">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr key={item._id}>
                        <td className="py-1 px-2 border-b">
                          <img
                            src={item.images && item.images[0] ? item.images[0].url : ''}
                            alt={item.name}
                            className="h-16 w-16 object-cover"
                          />
                        </td>
                        <td className="py-1 px-2 border-b">{item.name}</td>
                        <td className="py-1 px-2 border-b">{item.quantity}</td>
                        <td className="py-1 px-2 border-b">${item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td className="py-2 px-4 border-b">${order.itemPrice}</td>
              <td className="py-2 px-4 border-b">
                {editingOrderId === order._id ? (
                  <button
                    onClick={() => handleSaveStatus(order._id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditClick(order._id, order.orderStatus)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalSales, getTotalOrders, getTotalCustomers, getRecentOrders, getPopularProducts } from '../slices/orderSlice';
import Mkelia from '../assets/Mkelia.png';
import shopping from '../assets/shopping.png';
import basket from '../assets/basket.png';
import user from '../assets/user.png';

const Dashboard = () => {
  const dispatch = useDispatch();
  const {
    totalSales,
    totalOrders,
    totalCustomers,
    recentOrders,
    popularProducts,
    status,
    error
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getTotalSales());
    dispatch(getTotalOrders());
    dispatch(getTotalCustomers());
    dispatch(getRecentOrders());
    dispatch(getPopularProducts());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-slate-100">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow mb-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded focus:outline-none w-full md:w-64"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a7.002 7.002 0 00-5-6.71V4a3 3 0 10-6 0v.29A7.002 7.002 0 002 11v3.159c0 .538-.214 1.055-.595 1.436L0 17h5m10 0a3.001 3.001 0 01-2.829 2H7.83A3.001 3.001 0 015 17m10 0H9"
              ></path>
            </svg>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img
              src={Mkelia}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">Welcome to the admin dashboard!</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div><img src={basket} alt="Total Sales" className="w-16 h-16" /></div>
          <div className="text-center">
            <h2 className="text-xl">Total Sales</h2>
            <p className="text-2xl text-blue-500">${totalSales}</p>
            <p className="text-green-500">+343</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div><img src={user} alt="Total Customers" className="w-16 h-16" /></div>
          <div className="text-center">
            <h2 className="text-xl">Total Customers</h2>
            <p className="text-2xl text-blue-500">{totalCustomers}</p>
            <p className="text-red-500">-30</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div><img src={shopping} alt="Total Orders" className="w-16 h-16" /></div>
          <div className="text-center">
            <h2 className="text-xl">Total Orders</h2>
            <p className="text-2xl text-blue-500">{totalOrders}</p>
            <p className="text-red-500">-43</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">ID</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Product ID</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Customer Name</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Date</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Total</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Shipping Address</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-2 py-1 text-sm sm:text-base">#{order._id}</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">#{order.orderItems[0]?.product}</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">{order.user}</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">{order.totalAmount} rwf</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">{order.shippingInfo.address}, {order.shippingInfo.city}</td>
                    <td className="border px-2 py-1 text-sm sm:text-base">{order.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">Popular Products</h2>
          <ul>
            {popularProducts.map((product) => (
              <li key={product._id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <img src={product.images[0].url} alt={product.name} className="w-12 h-12 object-cover rounded mr-3" />
                  <span className="text-sm sm:text-base">{product.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm sm:text-base">{product.price} rwf</p>
                  <p className={`text-sm ${product.stock > 0 ? "text-green-500" : "text-red-500"}`}>
                    {product.stock > 0 ? `${product.stock} in Stock` : "Out of Stock"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

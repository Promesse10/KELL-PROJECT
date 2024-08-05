import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalSales, getTotalOrders, getTotalCustomers, getRecentOrders, getPopularProducts } from '../slices/orderSlice';
import Mkelia from '../assets/Mkelia.png';
import bean from './image-food/bean.jpg';
import rice from './image-food/rice.jpg';
import maize from './image-food/maize.jpg';
import sorghum from './image-food/sorghum.jpg';
import soybean from './image-food/soybean.jpg';
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
    popularProducts, // Add this line
    status,
    error
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getTotalSales());
    dispatch(getTotalOrders());
    dispatch(getTotalCustomers());
    dispatch(getRecentOrders());
    dispatch(getPopularProducts()); // Fetch popular products
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-slate-100">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow mb-4">
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded focus:outline-none"
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
              alt="Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>Welcome to the admin dashboard!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-4">
        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-14">
          <div><img src={basket} alt="image" className="w-16 h-16" /></div>
          <div>
            <h2 className="text-xl">Total Sales</h2>
            <p className="text-2xl text-blue-500">${totalSales}</p>
            <p className="text-green-500">+343</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-7">
          <div><img src={user} alt="image" className="w-16 h-16" /></div>
          <div>
            <h2 className="text-xl">Total Customers</h2>
            <p className="text-2xl text-blue-500">{totalCustomers}</p>
            <p className="text-red-500">-30</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow text-center flex flex-row gap-6 pt-10 pl-14">
          <div><img src={shopping} alt="image" className="w-16 h-16" /></div>
          <div>
            <h2 className="text-xl">Total Orders</h2>
            <p className="text-2xl text-blue-500">{totalOrders}</p>
            <p className="text-red-500">-43</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white p-4 rounded shadow-sm">
          <h2 className="text-xl mb-4 text-gray-600">Recent Orders</h2>
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Product ID</th>
                <th className="border px-4 py-2">Customer Name</th>
                <th className="border px-4 py-2">Order Date</th>
                <th className="border px-4 py-2">Order Total</th>
                <th className="border px-4 py-2">Shipping Address</th>
                <th className="border px-4 py-2">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="border px-4 py-2">#{order._id}</td>
                  <td className="border px-4 py-2">#{order.orderItems[0]?.product}</td>
                  <td className="border px-4 py-2">{order.user}</td>
                  <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="border px-4 py-2">{order.totalAmount} rwf</td>
                  <td className="border px-4 py-2">{order.shippingInfo.address}, {order.shippingInfo.city}</td>
                  <td className="border px-4 py-2">{order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popular Products */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">Popular Products</h2>
          <ul>
            {popularProducts.map((product) => (
              <li key={product._id} className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <img src={product.imageUrl} alt="image" className="w-10 h-10 object-cover rounded mr-2" />
                  <span>{product.name}</span>
                </div>
                <div className="text-right pt-3">
                  <p>{product.price} rwf</p>
                  <p className={product.stock > 0 ? "text-green-500" : "text-red-500"}>
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

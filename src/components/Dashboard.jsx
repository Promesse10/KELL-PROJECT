import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalSales, getTotalOrders, getTotalCustomers, getRecentOrders, getPopularProducts } from '../slices/orderSlice';
import Mkelia from '../assets/Mkelia.png';
import shopping from '../assets/shopping.png';
import basket from '../assets/basket.png';
import userIcon from '../assets/user.png';
import { fetchProfile } from '../slices/authSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

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
    if (typeof fetchProfile === 'function') {
      dispatch(fetchProfile()); 
    } else {
      console.error('fetchProfile is not defined');
    }
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center py-4">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-slate-100">
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow mb-4">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded focus:outline-none w-full md:w-64"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-full hover:bg-gray-100"></button>
          <button className="p-2 rounded-full hover:bg-gray-100"></button>
          <div className="w-10 h-10 rounded-full overflow-hidden">
            {user && user.profilePic && user.profilePic.length > 0 ? (
              <img
                src={user.profilePic[0].url}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <img
                src={userIcon}
                alt="Default Profile"
                className="w-full h-full object-cover rounded-full"
              />
            )}
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
            <p className="text-2xl text-blue-500">RWF:{totalSales}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div><img src={userIcon} alt="Total Customers" className="w-16 h-16" /></div>
          <div className="text-center">
            <h2 className="text-xl">Total Customers</h2>
            <p className="text-2xl text-blue-500">{totalCustomers}</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow flex items-center justify-between">
          <div><img src={shopping} alt="Total Orders" className="w-16 h-16" /></div>
          <div className="text-center">
            <h2 className="text-xl">Total Orders</h2>
            <p className="text-2xl text-blue-500">{totalOrders}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">Recent Orders</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">ID</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Product Name</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Customer Name</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Date</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Total</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Shipping Address</th>
                  <th className="border px-2 py-1 text-left text-sm sm:text-base">Order Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(recentOrders) && recentOrders.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td className="border px-2 py-1 text-sm sm:text-base">#{order._id}</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{order.orderItems[0]?.name}</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{order.user?.name}</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{order.itemPrice} rwf</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{order.shippingInfo.address}, {order.shippingInfo.city}</td>
                      <td className="border px-2 py-1 text-sm sm:text-base">{order.orderStatus}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="border px-2 py-1 text-center">No recent orders</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl mb-4 text-gray-600">Popular Products</h2>
          <ul>
            {popularProducts.length > 0 ? (
              popularProducts.map((product) => (
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
              ))
            ) : (
              <p className="text-center">No popular products available</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

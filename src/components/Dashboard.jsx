import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiDollarSign, FiShoppingBag, FiUsers } from 'react-icons/fi';
import {
  getTotalSales,
  getTotalOrders,
  getTotalCustomers,
  getRecentOrders,
  getPopularProducts,
} from '../slices/orderSlice';
import { fetchProfile } from '../slices/authSlice';

const formatCurrency = (amount) => `RWF ${Number(amount || 0).toLocaleString()}`;
const formatDate = (date) => (date ? new Date(date).toLocaleDateString() : '—');

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {
    totalSales,
    totalOrders,
    totalCustomers,
    recentOrders = [],
    popularProducts = [],
    status,
    error,
  } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(getTotalSales());
    dispatch(getTotalOrders());
    dispatch(getTotalCustomers());
    dispatch(getRecentOrders());
    dispatch(getPopularProducts());
  }, [dispatch]);

  const metrics = [
    { label: 'Total sales', value: formatCurrency(totalSales), icon: FiDollarSign, tone: 'gold' },
    { label: 'Total orders', value: Number(totalOrders || 0).toLocaleString(), icon: FiShoppingBag, tone: 'blue' },
    { label: 'Customers', value: Number(totalCustomers || 0).toLocaleString(), icon: FiUsers, tone: 'violet' },
  ];

  return (
    <section className="kk-admin-page kk-admin-dashboard">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">YOUR BUSINESS AT A GLANCE</span>
          <h1>Good day, {user?.name?.split(' ')[0] || 'Admin'} <span aria-hidden="true">✦</span></h1>
          <p>Here’s what’s happening across KarKelly today.</p>
        </div>
        <div className="kk-admin-dashboard__actions">
          <div className="kk-admin-date">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <Link className="kk-admin-quick-add" to="/admin/product">+ Add products</Link>
        </div>
      </div>

      {status === 'failed' && (
        <div className="kk-admin-alert" role="status">
          Some dashboard information could not be loaded{error ? `: ${error}` : '.'}
        </div>
      )}

      <div className="kk-admin-metrics">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <article className="kk-admin-metric" key={label}>
            <div className={`kk-admin-metric__icon is-${tone}`}><Icon aria-hidden="true" /></div>
            <div className="kk-admin-metric__copy">
              <span>{label}</span>
              <strong>{value}</strong>
              <small><FiArrowUpRight aria-hidden="true" /> Business overview</small>
            </div>
          </article>
        ))}
      </div>

      <div className="kk-admin-dashboard-grid">
        <section className="kk-admin-card kk-admin-recent">
          <div className="kk-admin-card__heading">
            <div><h2>Recent orders</h2><p>Your latest customer activity</p></div>
            <span className="kk-admin-count">{recentOrders.length} recent</span>
          </div>
          <div className="kk-admin-table-wrap">
            <table className="kk-admin-table">
              <thead><tr><th>Customer</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td><strong>{order.user?.name || 'Unknown customer'}</strong></td>
                    <td>{(order.orderItems || []).reduce((count, item) => count + Number(item.quantity || 0), 0)} items</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td><span className={`kk-admin-status is-${String(order.orderStatus || 'pending').toLowerCase()}`}>{order.orderStatus || 'Pending'}</span></td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
                {!recentOrders.length && (
                  <tr><td className="kk-admin-empty" colSpan="5">{status === 'loading' ? 'Loading recent orders…' : 'No recent orders to show yet.'}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="kk-admin-card kk-admin-popular">
          <div className="kk-admin-card__heading">
            <div><h2>Popular products</h2><p>Items customers are browsing</p></div>
          </div>
          <div className="kk-admin-popular__list">
            {popularProducts.map((product) => (
              <article className="kk-admin-popular__item" key={product._id}>
                {product.images?.[0]?.url
                  ? <img src={product.images[0].url} alt="" />
                  : <div className="kk-admin-popular__placeholder"><FiShoppingBag aria-hidden="true" /></div>}
                <div><strong>{product.name}</strong><span>{formatCurrency(product.price)} · {product.stock ?? 0} in stock</span></div>
              </article>
            ))}
            {!popularProducts.length && <p className="kk-admin-empty">{status === 'loading' ? 'Loading products…' : 'Popular products will appear here.'}</p>}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;

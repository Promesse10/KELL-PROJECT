import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiArrowUpRight, FiBookOpen, FiDollarSign, FiShoppingBag, FiTool, FiTruck, FiUsers,
} from 'react-icons/fi';
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
const serviceLinks = [
  { title: 'stationery', description: 'stationeryText', service: 'stationery', icon: FiBookOpen },
  { title: 'food', description: 'foodText', service: 'food', icon: FiShoppingBag },
  { title: 'hardware', description: 'hardwareText', service: 'hardware', icon: FiTool },
  { title: 'carSale', description: 'carSaleText', service: 'car-sale', icon: FiTruck },
  { title: 'carRental', description: 'carRentalText', service: 'car-rental', icon: FiTruck },
];

const Dashboard = () => {
  const { t, i18n } = useTranslation();
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
    { label: 'totalSales', value: formatCurrency(totalSales), icon: FiDollarSign, tone: 'gold' },
    { label: 'totalOrders', value: Number(totalOrders || 0).toLocaleString(), icon: FiShoppingBag, tone: 'blue' },
    { label: 'customers', value: Number(totalCustomers || 0).toLocaleString(), icon: FiUsers, tone: 'violet' },
  ];

  return (
    <section className="kk-admin-page kk-admin-dashboard">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">{t('admin.dashboard.eyebrow')}</span>
          <h1>{t('admin.dashboard.greeting', { name: user?.name?.split(' ')[0] || 'Admin' })} <span aria-hidden="true">✦</span></h1>
          <p>{t('admin.dashboard.intro')}</p>
        </div>
        <div className="kk-admin-dashboard__actions">
          <div className="kk-admin-date">{new Date().toLocaleDateString(i18n.resolvedLanguage?.startsWith('kin') ? 'rw-RW' : 'en', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
          <Link className="kk-admin-quick-add" to="/admin/product">{t('admin.dashboard.addProducts')}</Link>
        </div>
      </div>

      {status === 'failed' && (
        <div className="kk-admin-alert" role="status">
          {t('admin.dashboard.loadError')}{error ? `: ${error}` : '.'}
        </div>
      )}

      <div className="kk-admin-metrics">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <article className="kk-admin-metric" key={label}>
            <div className={`kk-admin-metric__icon is-${tone}`}><Icon aria-hidden="true" /></div>
            <div className="kk-admin-metric__copy">
              <span>{t(`admin.dashboard.${label}`)}</span>
              <strong>{value}</strong>
              <small><FiArrowUpRight aria-hidden="true" /> {t('admin.dashboard.overview')}</small>
            </div>
          </article>
        ))}
      </div>

      <section className="kk-admin-services" aria-labelledby="kk-admin-services-title">
        <div className="kk-admin-card__heading">
          <div><h2 id="kk-admin-services-title">{t('admin.dashboard.manageServices')}</h2><p>{t('admin.dashboard.manageServicesText')}</p></div>
        </div>
        <div className="kk-admin-service-links">
          {serviceLinks.map(({ title, description, service, icon: Icon }) => (
            <Link className="kk-admin-service-link" key={service} to={`/admin/product?service=${service}`}>
              <span className="kk-admin-service-link__icon"><Icon aria-hidden="true" /></span>
              <span className="kk-admin-service-link__copy"><strong>{t(`admin.dashboard.${title}`)}</strong><small>{t(`admin.dashboard.${description}`)}</small></span>
              <span className="kk-admin-service-link__action">{t('admin.dashboard.addItem')} <span aria-hidden="true">↗</span></span>
            </Link>
          ))}
        </div>
      </section>

      <div className="kk-admin-dashboard-grid">
        <section className="kk-admin-card kk-admin-recent">
          <div className="kk-admin-card__heading">
            <div><h2>{t('admin.dashboard.recentOrders')}</h2><p>{t('admin.dashboard.recentOrdersText')}</p></div>
            <span className="kk-admin-count">{t('admin.dashboard.recent', { count: recentOrders.length })}</span>
          </div>
          <div className="kk-admin-table-wrap">
            <table className="kk-admin-table">
              <thead><tr><th>{t('admin.dashboard.customer')}</th><th>{t('admin.dashboard.items')}</th><th>{t('admin.dashboard.total')}</th><th>{t('admin.dashboard.status')}</th><th>{t('admin.dashboard.date')}</th></tr></thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>
                    <td><strong>{order.user?.name || t('admin.dashboard.unknownCustomer')}</strong></td>
                    <td>{t('admin.dashboard.itemCount', { count: (order.orderItems || []).reduce((count, item) => count + Number(item.quantity || 0), 0) })}</td>
                    <td>{formatCurrency(order.totalAmount)}</td>
                    <td><span className={`kk-admin-status is-${String(order.orderStatus || 'pending').toLowerCase()}`}>{order.orderStatus || 'Pending'}</span></td>
                    <td>{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
                {!recentOrders.length && (
                  <tr><td className="kk-admin-empty" colSpan="5">{status === 'loading' ? t('admin.dashboard.loadingOrders') : t('admin.dashboard.noOrders')}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="kk-admin-card kk-admin-popular">
          <div className="kk-admin-card__heading">
            <div><h2>{t('admin.dashboard.popularProducts')}</h2><p>{t('admin.dashboard.popularProductsText')}</p></div>
          </div>
          <div className="kk-admin-popular__list">
            {popularProducts.map((product) => (
              <article className="kk-admin-popular__item" key={product._id}>
                {product.images?.[0]?.url
                  ? <img src={product.images[0].url} alt="" />
                  : <div className="kk-admin-popular__placeholder"><FiShoppingBag aria-hidden="true" /></div>}
                <div><strong>{product.name}</strong><span>{formatCurrency(product.price)} · {t('admin.dashboard.stockCount', { count: product.stock ?? 0 })}</span></div>
              </article>
            ))}
            {!popularProducts.length && <p className="kk-admin-empty">{status === 'loading' ? t('admin.dashboard.loadingProducts') : t('admin.dashboard.noPopularProducts')}</p>}
          </div>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;

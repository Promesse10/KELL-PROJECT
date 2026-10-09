import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getAllProducts, deleteProductById, updateProductById } from '../../slices/productSlice';

const getCategoryName = (product) => {
  const category = product.category;
  if (typeof category === 'string') return category;
  return category?.category || category?.name || '';
};

const getService = (product) => {
  const serviceType = String(product.serviceType || '').toLowerCase();
  if (serviceType === 'car') {
    return /^(rent|rental|car-rental)$/.test(String(product.listingType || '').toLowerCase()) ? 'car-rental' : 'car-sale';
  }
  if (['food', 'hardware', 'stationery', 'book'].includes(serviceType)) return serviceType;

  const category = getCategoryName(product).toLowerCase();
  const details = `${product.name || ''} ${category}`.toLowerCase();
  if (/car|vehicle/.test(category)) {
    return /^(rent|rental|car-rental)$/.test(String(product.listingType || '').toLowerCase()) ? 'car-rental' : 'car-sale';
  }
  if (/hardware|tool|plumb|bathroom|toilet|fastener|construction|building material|sanitary ware/.test(category)
    || /hammer|screw|nail|bolt|wrench|spanner|drill|saw|pliers|screwdriver|toilet|bathroom|faucet|tap|shower|sink|basin|pipe|valve|plumb/.test(details)) {
    return 'hardware';
  }
  if (/food/.test(category)) return 'food';
  if (/stationery|schoolmatetial|school material|school supply/.test(category)) return 'stationery';
  return 'other';
};

const ProductList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '', description: '', stock: '', imageFile: null });
  const [selectedService, setSelectedService] = useState('');
  const [actionError, setActionError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = async (_id) => {
    if (window.confirm(t('admin.common.confirmDelete'))) {
      setActionError('');
      try {
        await dispatch(deleteProductById(_id)).unwrap();
        await dispatch(getAllProducts()).unwrap();
      } catch (error) {
        setActionError(error?.response?.data?.message || error.message || t('admin.products.deleteError'));
      }
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      imageUrl: product.images?.[0]?.url || '',
      description: product.description,
      stock: product.stock,
      imageFile: null,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const price = Number(formData.price);
    const stock = Number(formData.stock);
    if (!formData.name.trim() || !formData.description.trim() || !Number.isFinite(price) || price <= 0
      || formData.stock === '' || !Number.isInteger(stock) || stock < 0) {
      setActionError(t('admin.products.stockRequired'));
      return;
    }
    if (selectedProduct) {
      setActionError('');
      setIsSaving(true);
      try {
        await dispatch(updateProductById({ id: selectedProduct._id, ...formData, price, stock })).unwrap();
        await dispatch(getAllProducts()).unwrap();
        setIsModalOpen(false);
      } catch (error) {
        setActionError(error?.response?.data?.message || error.message || t('admin.products.updateError'));
      } finally {
        setIsSaving(false);
      }
    }
  };

  const filteredProducts = products.filter((product) => (
    !selectedService || getService(product) === selectedService
  ));

  if (status === 'loading') {
    return <div className="kk-admin-state">{t('admin.dashboard.loadingProducts')}</div>;
  }

  if (status === 'failed') {
    return <div className="kk-admin-state is-error">{t('admin.products.inventoryLoadError')}: {error}</div>;
  }

  return (
    <div className="kk-admin-card kk-admin-product-list p-4 font-sans text-gray-800">
      <div className="kk-admin-card__heading">
        <div><h2>{t('admin.products.inventoryTitle')}</h2><p>{t('admin.products.inventoryIntro')}</p></div>
        <span className="kk-admin-count">{t('admin.products.productCount', { count: filteredProducts.length })}</span>
      </div>
      {actionError && <p className="kk-admin-batch__notice is-error" role="alert">{actionError}</p>}
      <div className="kk-admin-product-filter flex justify-between items-center mb-4">
        <label htmlFor="service-filter" className="text-lg font-medium">{t('admin.products.filterByService')}</label>
        <select
          id="service-filter"
          value={selectedService}
          onChange={(event) => setSelectedService(event.target.value)}
          className="border border-gray-300 p-2 rounded w-full max-w-xs"
        >
          <option value="">{t('admin.products.allServices')}</option>
          <option value="food">{t('admin.products.serviceFood')}</option>
          <option value="stationery">{t('admin.products.serviceStationery')}</option>
          <option value="hardware">{t('admin.products.serviceHardware')}</option>
          <option value="car-sale">{t('admin.products.serviceCarSale')}</option>
          <option value="car-rental">{t('admin.products.serviceCarRental')}</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">{t('admin.products.image')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.productName')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.price')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.description')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.service')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.stock')}</th>
              <th className="py-2 px-4 text-left">{t('admin.products.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={product.images?.[0]?.url || ''}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">RF-{product.price}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">{({
                  stationery: t('admin.products.serviceStationery'),
                  food: t('admin.products.serviceFood'),
                  hardware: t('admin.products.serviceHardware'),
                  'car-sale': t('admin.products.serviceCarSale'),
                  'car-rental': t('admin.products.serviceCarRental'),
                  other: t('admin.products.serviceOther'),
                })[getService(product)]}</td>
                <td className="py-2 px-4">
                  {Number(product.stock || 0)} {Number(product.stock || 0) === 0 ? `· ${t('admin.common.outOfStock')}` : Number(product.stock || 0) <= 5 ? `· ${t('admin.common.lowStock')}` : `· ${t('admin.common.inStock')}`}
                </td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    {t('admin.common.update')}
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    {t('admin.common.delete')}
                  </button>
                </td>
              </tr>
            ))}
            {!filteredProducts.length && <tr><td className="kk-admin-empty" colSpan="7">{t('admin.products.noProducts')}</td></tr>}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">{t('admin.products.updateProduct')}</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  {t('admin.products.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="price">
                  {t('admin.products.price')}
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  {t('admin.products.description')}
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="stock">
                  {t('admin.products.stock')}
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
                  {t('admin.products.image')}
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
                <input
                  type="file"
                  accept="image/*"
                  aria-label={t('admin.products.replaceImage')}
                  onChange={(event) => setFormData((current) => ({
                    ...current,
                    imageFile: event.target.files?.[0] || null,
                  }))}
                  className="w-full border border-gray-300 p-2 rounded mt-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  {isSaving ? t('admin.common.saving') : t('admin.common.save')}
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  {t('admin.common.cancel')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

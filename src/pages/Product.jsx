import React from 'react';
import { useTranslation } from 'react-i18next';
import ProductList from '../components/products/ProductList';
import CreateEditProduct from '../components/products/CreateEditProduct';

const ProductsPage = () => {
  const { t } = useTranslation();
  return (
    <section className="kk-admin-page">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">{t('admin.products.catalogueEyebrow')}</span>
          <h1>{t('admin.products.pageTitle')}</h1>
          <p>{t('admin.products.pageIntro')}</p>
        </div>
      </div>
      <div className="mb-4">
        <CreateEditProduct />
      </div>
      <ProductList />
    </section>
  );
};

export default ProductsPage;

import React from 'react';
import ProductList from '../components/products/ProductList';
import CreateEditProduct from '../components/products/CreateEditProduct';

const ProductsPage = () => {
  return (
    <section className="kk-admin-page">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">CATALOGUE MANAGEMENT</span>
          <h1>Products</h1>
          <p>Create, organize and update your product inventory.</p>
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

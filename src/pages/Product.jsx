import React from 'react';
import ProductList from '../components/products/ProductList';
import CreateEditProduct from '../components/products/CreateEditProduct';

const ProductsPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <CreateEditProduct />
      </div>
      <ProductList />
    </div>
  );
};

export default ProductsPage;

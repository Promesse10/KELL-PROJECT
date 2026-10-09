import React from 'react';
import CategoryList from '../components/Categories/CategoryList';
import CreateEditCategory from '../components/Categories/CreateEditCategory';

const CategoriesPage = () => {
  return (
    <section className="kk-admin-page">
      <div className="kk-admin-page-heading">
        <div>
          <span className="kk-admin-eyebrow">CATALOGUE ORGANIZATION</span>
          <h1>Categories</h1>
          <p>Keep your catalogue easy to browse and manage.</p>
        </div>
      </div>
      <div className="mb-4">
        <CreateEditCategory />
      </div>
      <CategoryList />
    </section>
  );
};

export default CategoriesPage;

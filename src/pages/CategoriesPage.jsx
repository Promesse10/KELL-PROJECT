import React from 'react';
import CategoryList from '../components/Categories/CategoryList';
import CreateEditCategory from '../components/Categories/CreateEditCategory';

const CategoriesPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="mb-4">
        <CreateEditCategory />
      </div>
      <CategoryList />
    </div>
  );
};

export default CategoriesPage;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../slices/categorySlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  if (status === 'loading') {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <ul className="list-disc list-inside">
        {categories.map((category) => (
          <li key={category.id} className="mb-2 text-lg">
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;

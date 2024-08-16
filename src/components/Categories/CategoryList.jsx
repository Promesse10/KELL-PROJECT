import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories,  } from '../../slices/categorySlice';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    // Dispatch action to delete the category
    dispatch(deleteCategory(id));
  };

  const handleUpdate = (id) => {
    // Dispatch action to update the category
    // This could involve opening a modal with a form to edit the category
    dispatch(updateCategory(id));
  };

  if (status === 'loading') {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (status === 'failed') {
    return <div className="text-center p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 lg:p-8">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-gray-300">Category ID</th>
            <th className="px-4 py-2 border-b border-gray-300">Category Name</th>
            <th className="px-4 py-2 border-b border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id} className="text-center">
              <td className="px-4 py-2 border-b border-gray-300">{category._id}</td>
              <td className="px-4 py-2 border-b border-gray-300">{category.category}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  onClick={() => handleUpdate(category.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;

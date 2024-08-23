import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, removeCategory, editCategory } from '../../slices/categorySlice';
import { toast, ToastContainer } from 'react-toastify';

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories, status, error } = useSelector((state) => state.categories);

  const [isUpdating, setIsUpdating] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(removeCategory(id)).unwrap();
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const handleUpdate = (category) => {
    setIsUpdating(true);
    setCurrentCategory(category);
    setNewCategoryName(category.category);
  };

  const submitUpdate = async () => {
    if (currentCategory && newCategoryName) {
      try {
        await dispatch(editCategory({ id: currentCategory._id, updatedCategory: newCategoryName })).unwrap();
        toast.success("Category updated successfully");
        setIsUpdating(false);
        setCurrentCategory(null);
      } catch (err) {
        toast.error("Failed to update category");
      }
    }
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
      {isUpdating && (
        <div className="mb-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            onClick={submitUpdate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Save
          </button>
          <button
            onClick={() => setIsUpdating(false)}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded ml-2"
          >
            Cancel
          </button>
        </div>
      )}
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
            <tr key={category._id} className="text-center">
              <td className="px-4 py-2 border-b border-gray-300">{category._id}</td>
              <td className="px-4 py-2 border-b border-gray-300">{category.category}</td>
              <td className="px-4 py-2 border-b border-gray-300">
                <button
                  onClick={() => handleUpdate(category)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(category._id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer/>
    </div>
  );
};

export default CategoryList;

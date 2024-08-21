import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../slices/categorySlice';
import { toast } from 'react-toastify';

const CreateEditCategory = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCategory({ category: name })).unwrap();
      toast.success('Category created successfully');
      setName('');
    } catch (err) {
      toast.error('Failed to create category');
    }
  };

  return (
    <div className="p-4 lg:p-8 flex justify-center lg:justify-start">
      <div className="w-full max-w-md lg:max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-lg">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full rounded-lg shadow-md"
              placeholder="Enter category name"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEditCategory;

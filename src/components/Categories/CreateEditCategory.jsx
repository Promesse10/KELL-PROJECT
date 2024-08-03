import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../slices/categorySlice';

const CreateEditCategory = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = { name };
    dispatch(addCategory(category));
    setName('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Create Category</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full shadow-md"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Create</button>
      </form>
    </div>
  );
};

export default CreateEditCategory;

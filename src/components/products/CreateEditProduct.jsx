import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProduct } from '../../slices/productSlice';
import { fetchCategories } from '../../sevices/api';

const CreateEditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategoriesData();
  }, []);

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price || !stock || !category) {
      toast.error("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('category', category);

    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await dispatch(addProduct(formData)).unwrap();
      const newProduct = response; // Assuming response contains the new product details

      // Store product data in local storage
      localStorage.setItem('newProduct', JSON.stringify(newProduct));

      // Store notification in local storage
      const now = new Date().toISOString();
      localStorage.setItem('productNotification', JSON.stringify({ createdAt: now }));

      setName('');
      setDescription('');
      setPrice('');
      setStock('');
      setCategory('');
      setFile(null);

      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Failed to create product:", error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="p-4 lg:p-8 max-w-screen-lg mx-auto lg:mx-0">
      <h2 className="text-2xl font-bold mb-4 text-blue-950">Create Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4 lg:w-1/2">
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-full shadow-md rounded"
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.category}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium">Image</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        {file && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />
          </div>
        )}
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateEditProduct;

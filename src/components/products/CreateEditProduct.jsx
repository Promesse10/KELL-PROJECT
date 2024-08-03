import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';

const CreateEditProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Mock function to simulate fetching categories from an API
    const fetchCategories = async () => {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ public_id: file.name, url: reader.result });
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises)
      .then(results => setImages(results))
      .catch(error => console.error('Error uploading images:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = { name, description, price, stock, category, images };
    dispatch(addProduct(product));
    setName('');
    setDescription('');
    setPrice('');
    setStock('');
    setCategory('');
    setImages([]);
  };

  return (
    <div  >
      <h2 className="text-2xl font-inter mb-4  text-blue-950">Create Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-1/2 shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-1/2 shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border p-2 w-1/2 shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="border p-2 w-1/2 shadow-md"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 w-1/2 shadow-md"
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-2">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-1/2 shadow-md"
          />
        </div>
        <div className="mb-4">
          {images.map((img, index) => (
            <img key={index} src={img.url} alt={img.public_id} className="w-32 h-32 object-cover" />
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2">Create</button>
      </form>
    </div>
  );
};

export default CreateEditProduct;

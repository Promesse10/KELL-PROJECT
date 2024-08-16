import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/productSlice';
import { fetchCategories } from '../../sevices/api'; 

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
          <label className="block mb-1 text-sm font-medium">Images</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full shadow-md rounded"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-2">
          {images.map((img, index) => (
            <img
              key={index}
              src={img.url}
              alt={img.public_id}
              className="w-24 h-24 object-cover rounded"
            />
          ))}
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Create</button>
      </form>
    </div>
  );
};

export default CreateEditProduct;

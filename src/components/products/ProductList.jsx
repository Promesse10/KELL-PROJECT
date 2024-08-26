import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProductById, updateProductById } from '../../slices/productSlice';
import { getCategories } from '../../slices/categorySlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '', description: '', stock: '' });
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const handleDelete = async (_id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await dispatch(deleteProductById(_id));
      dispatch(getAllProducts()); // Fetch the updated product list
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      imageUrl: product.images[0]?.url || '',
      description: product.description,
      stock: product.stock,
    });
    setIsModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.description || !formData.stock) {
      alert('All fields are required!');
      return;
    }
    if (selectedProduct) {
      await dispatch(updateProductById({ id: selectedProduct._id, ...formData }));
      dispatch(getAllProducts()); // Fetch the updated product list
      setIsModalOpen(false);
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category?.category === selectedCategory)
    : products;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4 font-sans text-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center">Products List</h2>
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="category" className="text-lg font-medium">
          Filter by Category:
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="border border-gray-300 p-2 rounded w-full max-w-xs"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 text-sm md:text-base">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={product.images[0]?.url || ''}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">RF-{product.price}</td>
                <td className="py-2 px-4">{product.description}</td>
                <td className="py-2 px-4">{product.category?.category || 'N/A'}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="price">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="stock">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1" htmlFor="imageUrl">
                  Image URL
                </label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleFormChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

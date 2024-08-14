import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts, deleteProductById, updateProductById } from '../../slices/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error } = useSelector((state) => state.products);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', imageUrl: '' });

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProductById(id));
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (selectedProduct) {
      dispatch(updateProductById({ id: selectedProduct.id, ...formData }));
      setIsModalOpen(false);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Product Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button
                    onClick={() => handleUpdateClick(product)}
                    className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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

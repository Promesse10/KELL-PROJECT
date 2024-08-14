import React, { useState } from 'react';

const OrderForm = () => {
  const [items, setItems] = useState([{ name: '', price: '', quantity: '', imageUrl: '', productId: '' }]);

  const handleChange = (index, event) => {
    const values = [...items];
    values[index][event.target.name] = event.target.value;
    setItems(values);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', price: '', quantity: '', imageUrl: '', productId: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { items });
  };

  return (
    <div className="bg-gray-200 min-h-screen mt-24 flex items-center justify-center">
      <div className="w-full max-w-lg lg:max-w-2xl mx-auto bg-gray-100 shadow-lg rounded-lg p-6 md:p-8 mt-16 mb-10">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Shipping Information */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Shipping Information</h3>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="city"
              placeholder="City"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Order Items</h3>
            {items.map((item, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  name="name"
                  value={item.name}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Name"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="price"
                  value={item.price}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Price"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="quantity"
                  value={item.quantity}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Quantity"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="imageUrl"
                  value={item.imageUrl}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Image URL"
                  className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                />
                <input
                  type="text"
                  name="productId"
                  value={item.productId}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Product ID"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Item
            </button>
          </div>

          {/* Payment Information */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Payment Information</h3>
            <select
              name="paymentMethod"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
            >
              <option value="Card">Card</option>
              <option value="PayPal">PayPal</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Price Details */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Price Details</h3>
            <input
              type="text"
              name="itemPrice"
              placeholder="Item Price"
              className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              name="totalAmount"
              placeholder="Total Amount"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-950"
          >
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;

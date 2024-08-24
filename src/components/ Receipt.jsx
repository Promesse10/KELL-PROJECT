import React from 'react';
import { useLocation } from 'react-router-dom';

function Receipt() {
  const location = useLocation();
  const { shippingInfo = {}, cart = [], totalPrice = 0, deliveryMethod, shippingCost = 0, paymentMethod } = location.state || {};
  const username = "User Name"; // Replace with actual username if available

  return (
    <div className="flex flex-col min-h-screen mt-5">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-semibold">Order Receipt</h1>
      </header>
      <main className="flex py-10 px-6">
        <div className="flex w-full max-w-7xl mx-auto">
          <div className="w-full">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* User Information */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">User Information</h2>
                <p className="text-sm">Username: {username}</p>
              </div>

              {/* Shipping Information */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
                <p>{shippingInfo.name || 'N/A'}</p>
                <p>{shippingInfo.address || 'N/A'}, {shippingInfo.city || 'N/A'}</p>
                <p>{shippingInfo.phone || 'N/A'}</p>
              </div>

              {/* Order Items */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Order Items</h2>
                <ul>
                  {cart.length ? cart.map((item, index) => (
                    <li key={index} className="mb-2">
                      <div className="flex justify-between items-center">
                        <img src={item.images[0]?.url} alt={item.name} className="h-16 w-16 object-cover rounded" />
                        <div className="flex-1 ml-4">
                          <div className="flex justify-between">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>{(item.price || 0).toLocaleString()} RWF</span>
                          </div>
                        </div>
                      </div>
                    </li>
                  )) : <p>No items in the cart</p>}
                </ul>
              </div>

              {/* Order Summary */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Subtotal</span>
                  <span>{totalPrice.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Shipping Cost</span>
                  <span>{shippingCost.toLocaleString()} RWF</span>
                </div>
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{(totalPrice + shippingCost).toLocaleString()} RWF</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <p>{paymentMethod === 'bank' ? 'Bank Deposit' : paymentMethod === 'momo' ? 'MTN Mobile Money' : 'Cash on Delivery'}</p>
                {paymentMethod === 'momo' && (
                  <p>MTN Number: *182*8*1*1234567890#</p>
                )}
              </div>

              {/* Delivery Method */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Delivery Method</h2>
                <p>{deliveryMethod === 'pickup' ? 'Pickup in store' : 'Ship'}</p>
              </div>

              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">Go to Homepage</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Receipt;

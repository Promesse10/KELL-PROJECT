import React, { useState } from 'react';
import Header from '../components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import momo from '../assets/MTN.png'; 
import { useDispatch } from 'react-redux';
import { createOrder } from '../slices/orderSlice';

function Checkout() {
  const location = useLocation();
  const { cart = [], userId } = location.state || {};
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    country: 'Rwanda',
    name: '',
    address: '',
    city: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);
  const shippingCost = deliveryMethod === 'pickup' ? 0 : 2000;
  const subtotal = totalPrice;
  const totalAmount = subtotal + shippingCost;

  const formattedPaymentMethod = paymentMethod === 'bank' ? 'CARD' : paymentMethod === 'momo' ? 'MTN' : paymentMethod;

  const handleOrderClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        shippingInfo,
        orderItems: cart.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0]?.url,
          product: item._id,
        })),
        paymentMethod: formattedPaymentMethod,
        itemPrice: totalPrice,
        user: userId,
        shippingCost: deliveryMethod === 'pickup' ? 0 : shippingCost,
        totalAmount: totalPrice + (deliveryMethod === 'pickup' ? 0 : shippingCost),
      };

      const response = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order created:", response);
      navigate('/receipt', { state: { shippingInfo, cart, totalPrice, deliveryMethod, shippingCost, paymentMethod } });
    } catch (error) {
      console.error("Error during checkout:", error);
      setError('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col md:flex-row py-10 px-6">
        <div className="flex flex-col md:flex-row w-full max-w-7xl mx-auto">
          <div className="w-full md:w-3/4 pr-0 md:pr-4">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              {/* Delivery Section */}
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>
              <div className="mb-4">
                <label className={`block border-2 p-3 rounded-lg ${deliveryMethod === 'ship' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600 cursor-pointer`}>
                  <input type="radio" name="deliveryMethod" value="ship" checked={deliveryMethod === 'ship'} onChange={() => setDeliveryMethod('ship')} className="hidden" />
                  <span className="ml-2">Ship</span>
                </label>
                <label className={`block border-2 p-3 mt-4 rounded-lg ${deliveryMethod === 'pickup' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600 cursor-pointer`}>
                  <input type="radio" name="deliveryMethod" value="pickup" checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="hidden" />
                  <span className="ml-2">Pickup in store</span>
                </label>
              </div>

              {/* Store Locations */}
              {deliveryMethod === 'pickup' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">Store locations</h3>
                  <p className="text-sm text-gray-600 mb-4">There is 1 store with stock close to your location</p>
                  <div className="mb-2">
                    <label className="block bg-blue-50 p-4 rounded border border-blue-200">
                      <div className="flex justify-between items-center">
                        <span>Online Stationery Supplies</span>
                        <span className="text-sm text-blue-600 font-semibold">Free</span>
                      </div>
                      <div className="text-sm text-gray-600">59 KN 59 Street, Kigali</div>
                      <div className="text-sm text-gray-500">Usually ready in 24 hours</div>
                    </label>
                  </div>
                  <a href="#" className="text-blue-600 text-sm">Change my location</a>
                </div>
              )}

              {/* Shipping Information */}
              {deliveryMethod === 'ship' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="country" value={shippingInfo.country} onChange={handleShippingChange} disabled className="p-3 border rounded-lg w-full bg-gray-100" />
                    <input type="text" name="address" placeholder="Your address. e.g KN 59 st & (house number or Building name)" value={shippingInfo.address} onChange={handleShippingChange} className="p-3 border rounded-lg w-full" />
                    <input type="text" name="city" placeholder="City" value={shippingInfo.city} onChange={handleShippingChange} className="p-3 border rounded-lg w-full" />
                    <input type="text" name="phone" placeholder="Phone" value={shippingInfo.phone} onChange={handleShippingChange} className="p-3 border rounded-lg w-full" />
                    <label className="inline-flex items-center mt-4">
                      <input type="checkbox" checked={saveInfo} onChange={() => setSaveInfo(!saveInfo)} className="form-checkbox h-4 w-4 text-blue-600" />
                      <span className="ml-2">Save this information for next time</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Payment Section */}
              <h2 className="text-xl font-semibold mb-4 mt-6">Payment</h2>
              <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
              <div className="mb-6">
                <label className={`block border-2 p-3 rounded-lg ${paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600 cursor-pointer`}>
                  <input type="radio" name="paymentMethod" value="cod" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="hidden" />
                  <span className="ml-2">Cash on Delivery (COD)</span>
                </label>
                <label className={`block border-2 p-3 mt-4 rounded-lg ${paymentMethod === 'bank' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600 cursor-pointer`}>
                  <input type="radio" name="paymentMethod" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} className="hidden" />
                  <span className="ml-2">Bank Deposit</span>
                  {paymentMethod === 'bank' && (
                    <div className="bg-gray-100 p-4 mt-4 border border-gray-200 rounded">
                      <h4 className="font-semibold">Bank Details</h4>
                      <p>Bank Name: Your Bank</p>
                      <p>Account Number: 1234567890</p>
                      <p>Account Name: Your Name</p>
                      <p>SWIFT/BIC: ABCDEF12</p>
                    </div>
                  )}
                </label>
                <label className={`block border-2 p-3 mt-4 rounded-lg ${paymentMethod === 'momo' ? 'border-blue-600' : 'border-gray-300'} hover:border-blue-600 cursor-pointer`}>
                  <input type="radio" name="paymentMethod" value="momo" checked={paymentMethod === 'momo'} onChange={() => setPaymentMethod('momo')} className="hidden" />
                  <div className="flex items-center">
                    <img src={momo} alt="MTN Mobile Money" className="h-6 mr-2" />
                    <span>MTN Mobile Money</span>
                  </div>
                </label>
              </div>

              {/* Error Message */}
              {error && <p className="text-red-600">{error}</p>}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full md:w-1/4 mt-8 md:mt-0 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="mb-4">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>RWF {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span>Shipping</span>
                <span>RWF {shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mt-2 border-t border-gray-300 pt-4">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">RWF {totalAmount.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={handleOrderClick} disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;

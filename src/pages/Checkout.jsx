import React, { useState } from 'react';
import Header from '../components/Header'; // Import the Header component
import { useLocation } from 'react-router-dom';
import momo from '../assets/MTN.png' 
function Checkout() {
  const location = useLocation();
  const { cart = [] } = location.state || {}; // Retrieve cart data from state
  const [deliveryMethod, setDeliveryMethod] = useState('ship');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [billingAddressSame, setBillingAddressSame] = useState(true);
  const [saveInfo, setSaveInfo] = useState(false);

  // Shipping information state
  const [shippingInfo, setShippingInfo] = useState({
    country: 'Rwanda',
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    city: '',
    phone: ''
  });

  // Handle change in shipping information
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Calculate the total price from the cart
  const totalPrice = cart.reduce((total, item) => total + (item.price || 0) * (item.quantity || 0), 0);

  // Conditionally set the shipping cost
  const shippingCost = deliveryMethod === 'pickup' ? 'Free' : 2000;

  return (
    <div className="flex flex-col min-h-screen">
      <Header /> {/* Include the Header here */}
      <main className="flex py-10 px-6">
        <div className="w-2/4 max-w-4xl mx-auto ">
          <div className="flex mx-4 mb-10">
            {/* Delivery Section */}
            <div className="w-full px-1 mb-6 md:mb-0">
              <h2 className="text-xl font-semibold mb-4">Delivery</h2>
              <div className="mb-4">
                <label
                  className={`block border-2 p-3 rounded-lg ${
                    deliveryMethod === 'ship' ? 'border-blue-600' : 'border-gray-300'
                  } hover:border-blue-600 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="ship"
                    checked={deliveryMethod === 'ship'}
                    onChange={() => setDeliveryMethod('ship')}
                    className="hidden"
                  />
                  <span className="ml-2">Ship</span>
                </label>
                <label
                  className={`block border-2 p-3 mt-4 rounded-lg ${
                    deliveryMethod === 'pickup' ? 'border-blue-600' : 'border-gray-300'
                  } hover:border-blue-600 cursor-pointer`}
                >
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="hidden"
                  />
                  <span className="ml-2">Pickup in store</span>
                </label>
              </div>

              {/* Store Locations (only visible when Pickup in store is selected) */}
              {deliveryMethod === 'pickup' && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold">Store locations</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    There is 1 store with stock close to your location
                  </p>
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
                  <a href="#" className="text-blue-600 text-sm">
                    Change my location
                  </a>
                </div>
              )}

              {/* Shipping Information Form (only visible when Ship is selected) */}
              {deliveryMethod === 'ship' && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      name="country"
                      value={shippingInfo.country}
                      onChange={handleShippingChange}
                      disabled
                      className="p-3 border rounded-lg w-full bg-gray-100"
                    />
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First name"
                      value={shippingInfo.firstName}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last name"
                      value={shippingInfo.lastName}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <input
                      type="text"
                      name="companyName"
                      placeholder="Company name & TIN (optional)"
                      value={shippingInfo.companyName}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Your address. e.g KN 59 st & (house number or Building name)"
                      value={shippingInfo.address}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={shippingInfo.city}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={shippingInfo.phone}
                      onChange={handleShippingChange}
                      className="p-3 border rounded-lg w-full"
                    />
                    <label className="inline-flex items-center mt-4">
                      <input
                        type="checkbox"
                        checked={saveInfo}
                        onChange={() => setSaveInfo(!saveInfo)}
                        className="form-checkbox h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2">Save this information for next time</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <h2 className="text-xl font-semibold mb-4">Payment</h2>
          <p className="text-sm text-gray-600 mb-4">All transactions are secure and encrypted.</p>
          <div className="mb-6">
            <label
              className={`block border-2 p-3 rounded-lg ${
                paymentMethod === 'cod' ? 'border-blue-600' : 'border-gray-300'
              } hover:border-blue-600 cursor-pointer`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={paymentMethod === 'cod'}
                onChange={() => setPaymentMethod('cod')}
                className="hidden"
              />
            
              <span className="ml-2">Cash on Delivery (COD)</span>
              {paymentMethod === 'cod' && (
              <div className="bg-gray-100 p-4 mt-4  ">
               You can pay cash when you get your order
              </div>
            )}
            </label>
           
            <label
              className={`block border-2 p-3 mt-4 rounded-lg ${
                paymentMethod === 'bank' ? 'border-blue-600' : 'border-gray-300'
              } hover:border-blue-600 cursor-pointer`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="bank"
                checked={paymentMethod === 'bank'}
                onChange={() => setPaymentMethod('bank')}
                className="hidden"
              />
              <span className="ml-2">Bank Deposit</span>
            </label>
            {paymentMethod === 'bank' && (
              <div className="bg-gray-100 p-4 mt-4 rounded-lg ">
                <p>ACCOUNT NAME : Karry Kelly <br />
                  ACCOUNT NUMBER : <strong>4004200467639  </strong> <br />
                   BANK NAME : EQUITY BANK</p>
              </div>
            )}
            <label
              className={`block border-2 p-3 mt-4 rounded-lg ${
                paymentMethod === 'momo' ? 'border-blue-600' : 'border-gray-300'
              } hover:border-blue-600 cursor-pointer`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="momo"
                checked={paymentMethod === 'momo'}
                onChange={() => setPaymentMethod('momo')}
                className="hidden"
              />
              <span className="ml-2">MTN MOBILE MONEY</span>
            </label>

            {/* Additional instructions for MTN MOBILE MONEY */}
            {paymentMethod === 'momo' && (
              <div className="bg-gray-100 p-4 mt-4 rounded-lg ">
                <p className="text-sm text-gray-700">
                 
                  
                </p>
                <img src={momo} className="w-28" /> Kanda | Dial: <strong>*182*8*1*000030#</strong><br />
                Ishyura ayangaya|Pay this <strong> {shippingCost === 'Free' ? totalPrice : totalPrice + (shippingCost || 0)}Frw  </strong>
              </div>
            )}
          </div>

          <label className="inline-flex items-center mt-4">
            <input
              type="checkbox"
              checked={billingAddressSame}
              onChange={() => setBillingAddressSame(!billingAddressSame)}
              className="form-checkbox h-4 w-4 text-blue-600"
            />
            <span className="ml-2">Billing address is the same as shipping address</span>
          </label>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3 px-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            {cart.map((item) => (
              <div key={item._id} className="relative flex items-center mb-3">
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div className="absolute top-0 right-0 w-8 h-8 bg-red-600 text-white flex items-center justify-center rounded-full text-xs font-bold">
                  {item.quantity}
                </div>
                <div className="flex-grow">
                  <span className="block font-semibold">{item.name}</span>
                  <span>{item.price * item.quantity} RF</span>
                </div>
              </div>
            ))}
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>{totalPrice} RF</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>{deliveryMethod === 'pickup' ? 'Pickup in store' : 'Shipping'}</span>
              <span>{shippingCost === 'Free' ? 'Free' : `RF ${shippingCost}`}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-3">
              <span>Total</span>
              <span>
                RF{' '}
                {shippingCost === 'Free' ? totalPrice : totalPrice + (shippingCost || 0)}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Checkout;

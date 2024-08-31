import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import momo from "../assets/MTN.png";
import { useSelector, useDispatch } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { fetchProfile } from "../slices/authSlice";
import { clearCart } from "../slices/cartSlice";

function Checkout() {
  const location = useLocation();
  const { cart = [], userId } = location.state || {};
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const [deliveryMethod, setDeliveryMethod] = useState("ship");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [saveInfo, setSaveInfo] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    country: "Rwanda",
    name: user?.name || "",
    address: user?.address,
    city: "",
    phone: user?.phone,
    fullname: user?.name,
    region: "Kigali", // Added default region
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define shipping costs by region
  const shippingCosts = {
    Kigali: 2000,
    Northern : 3000,
    Southern: 4000,
    Western: 5000,
    Eastern: 6000,
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  // Update shippingCost based on region
  const shippingCost =
    deliveryMethod === "pickup"
      ? 0
      : shippingCosts[shippingInfo.region] || 2000;

  const totalPrice = cart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );
  const subtotal = totalPrice;
  const totalAmount = subtotal + shippingCost;

  const formattedPaymentMethod =
    paymentMethod === "bank"
      ? "CARD"
      : paymentMethod === "momo"
      ? "MTN"
      : paymentMethod;

  const handleOrderClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        shippingInfo,
        orderItems: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.images[0]?.url,
          product: item._id,
        })),
        paymentMethod: formattedPaymentMethod,
        itemPrice: totalPrice,
        user: userId,
        shippingCost: deliveryMethod === "pickup" ? 0 : shippingCost,
        totalAmount:
          totalPrice + (deliveryMethod === "pickup" ? 0 : shippingCost),
      };

      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await dispatch(createOrder(orderData)).unwrap();
      console.log("Order created:", response);

      // Clear cart after order creation
      dispatch(clearCart());

      await new Promise((resolve) => setTimeout(resolve, 3000));
      navigate("/receipt", {
        state: {
          shippingInfo,
          cart,
          totalPrice,
          deliveryMethod,
          shippingCost,
          paymentMethod,
        },
      });
    } catch (error) {
      console.error("Error during checkout:", error);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // State to control the visibility of the shipping options panel
  const [showShippingOptions, setShowShippingOptions] = useState(false);

  // Toggle the visibility when delivery method changes to 'ship'
  useEffect(() => {
    if (deliveryMethod === "ship") {
      setShowShippingOptions(true);
    } else {
      setShowShippingOptions(false);
    }
  }, [deliveryMethod]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col md:flex-row py-10 px-6">
        <div className="w-full md:w-2/3 md:pr-4 mb-10 md:mb-0">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            {/* Delivery Section */}
            <h2 className="text-xl font-semibold mb-4">Delivery</h2>
            <div className="mb-4">
              <label
                className={`block border-2 p-3 rounded-lg ${
                  deliveryMethod === "ship"
                    ? "border-blue-600"
                    : "border-gray-300"
                } hover:border-blue-600 cursor-pointer`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="ship"
                  checked={deliveryMethod === "ship"}
                  onChange={() => setDeliveryMethod("ship")}
                  className="hidden"
                />
                <span className="ml-2">Ship</span>
              </label>
           
            </div>

            {/* Store Locations */}
            

            {/* Shipping Information */}
            {deliveryMethod === "ship" && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Shipping Information
                </h3>
                <div className="flex flex-col space-y-4">
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
                    name="fullname"
                    placeholder="Enter Your Fullname"
                    value={shippingInfo.fullname}
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
                  <label className="inline-flex items-center mt-2">
                    <input
                      type="checkbox"
                      checked={saveInfo}
                      onChange={() => setSaveInfo(!saveInfo)}
                      className="form-checkbox h-4 w-4 text-blue-600"
                    />
                    <span className="ml-2">
                      Save this information for next time
                    </span>
                  </label>
                </div>

                {/* Shipping Options Panel */}
                {showShippingOptions && (
                  <div className="mt-6 transition-all duration-500 ease-in-out">
                    <h3 className="text-lg font-semibold mb-4">
                      Select Your Region
                    </h3>
                    <div className="flex flex-col space-y-4">
                      {Object.keys(shippingCosts).map((region) => (
                        <label key={region} className="flex items-center">
                          <input
                            type="radio"
                            name="region"
                            value={region}
                            checked={shippingInfo.region === region}
                            onChange={(e) =>
                              setShippingInfo((prev) => ({
                                ...prev,
                                region: e.target.value,
                              }))
                            }
                            className="form-radio h-4 w-4 text-blue-950"
                          />
                          <span className="ml-2">
                            {region} ({shippingCosts[region].toLocaleString()} RWF)
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Payment Section */}
            <h2 className="text-xl font-semibold mb-4 mt-6">Payment</h2>
            <p className="text-sm text-gray-600 mb-4">
              All transactions are secure and encrypted.
            </p>
            <div className="mb-6">
              <label
                className={`block border-2 p-3 mt-4 rounded-lg ${
                  paymentMethod === "bank"
                    ? "border-blue-600"
                    : "border-gray-300"
                } hover:border-blue-600 cursor-pointer`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="hidden"
                />
                <span className="ml-2">Bank Deposit</span>
                {paymentMethod === "bank" && (
                  <div className="bg-gray-100 p-4 mt-4 border border-gray-200 rounded">
                    <h4 className="font-semibold">Bank Details</h4>
                    <p>Bank Name: Bank popular</p>
                    <p>Account Number: 415235534210119</p>
                    <p>Account Name: NDAYISHIMIYE Jason</p>
                   
                  </div>
                )}
              </label>
              <label
                className={`block border-2 p-3 mt-4 rounded-lg ${
                  paymentMethod === "momo"
                    ? "border-blue-600"
                    : "border-gray-300"
                } hover:border-blue-600 cursor-pointer`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="momo"
                  checked={paymentMethod === "momo"}
                  onChange={() => setPaymentMethod("momo")}
                  className="hidden"
                />
                <div className="flex items-center">
                  <img
                    src={momo}
                    alt="MTN Mobile Money"
                    className="h-6 w-6 mr-2"
                  />
                  <span className="ml-2">MTN Mobile Money</span>
                </div>
                {paymentMethod === "momo" && (
                  <div className="bg-gray-100 p-4 mt-4 border border-gray-200 rounded">
                    <h4 className="font-semibold">Mobile Money Details</h4>
                    <p>MTN Number: *182*8*1*146577#</p>
                    <p>Momo Name: Jason </p>
                  </div>
                )}
              </label>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-600">{error}</p>}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>
              <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <li key={index} className="flex items-center">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="h-16 w-16 object-cover rounded mr-4 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>
                          {(item.price * item.quantity).toLocaleString()} RWF
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="mb-4 space-y-2">
              <div className="flex justify-between items-center">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()} RWF</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Shipping Cost</span>
                <span>{shippingCost.toLocaleString()} RWF</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="font-semibold">
                  {totalAmount.toLocaleString()} RWF
                </span>
              </div>
            </div>

            <button
              onClick={handleOrderClick}
              disabled={loading}
              className="bg-blue-950 text-white px-4 py-2 rounded-lg w-full"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </main>
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <iframe
              src="https://lottie.host/embed/c350b974-c557-4b08-988f-94ef261d7410/js1HNBuLRg.json"
              title="Loading Animation"
              className="h-64 w-64"
            ></iframe>
            <h1 className="mt-4 text-xl font-semibold">
              Your order has been sent successfully!
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Checkout;

import React from 'react';
import { useLocation } from 'react-router-dom';

const Receipt = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  return (
    <div className="flex mt-20 justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-md shadow-md max-w-4xl w-full flex flex-row">
        <div className="w-3/4 pr-8">
          <h2 className="text-xl font-bold mb-2">Order #{orderDetails?.orderId}</h2>
          <p>Thank you, {orderDetails?.shippingInfo.firstName}!</p>
          <p>Your order is confirmed. You’ll receive an email when your order is ready.</p>
          <div className="border-t mt-4 pt-4">
            <h3 className="font-bold">Order details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Contact information:</p>
                <h5>{orderDetails?.shippingInfo.email}</h5>
              </div>
              <div>
                <p className="font-bold">Payment method:</p>
                <p>{orderDetails?.paymentMethod} - {orderDetails?.totalPrice + (orderDetails?.shippingCost || 0)} Frw</p>
              </div>
              <div>
                <p className="font-bold">Shipping address:</p>
                <p>{orderDetails?.shippingInfo.firstName} {orderDetails?.shippingInfo.lastName}</p>
                <p>{orderDetails?.shippingInfo.address}</p>
                <p>{orderDetails?.shippingInfo.city}</p>
                <p>{orderDetails?.shippingInfo.country}</p>
                <p>{orderDetails?.shippingInfo.phone}</p>
              </div>
              <div>
                <p className="font-bold">Billing address:</p>
                <p>{orderDetails?.shippingInfo.firstName} {orderDetails?.shippingInfo.lastName}</p>
                <p>{orderDetails?.shippingInfo.address}</p>
                <p>{orderDetails?.shippingInfo.city}</p>
                <p>{orderDetails?.shippingInfo.country}</p>
                <p>{orderDetails?.shippingInfo.phone}</p>
              </div>
              <div className="col-span-2">
                <p className="font-bold">Shipping method:</p>
                <p>{orderDetails?.deliveryMethod === 'pickup' ? 'Pickup in store' : 'Kigali City (shipping charge is paid before order delivered)'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-gray-50 p-6 rounded-md">
          {orderDetails?.product.map((item, index) => (
            <div key={index}>
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain mb-4" />
              <h4 className="font-bold">{item.name}</h4>
              <p>{item.price} Frw</p>
              <div className="flex justify-between mt-4">
                <p>Subtotal</p>
                <p>{item.price * item.quantity} Frw</p>
              </div>
            </div>
          ))}
          <div className="flex justify-between font-bold border-t pt-2 mt-2">
            <p>Total</p>
            <p>{orderDetails?.totalPrice + (orderDetails?.shippingCost || 0)} Frw</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt;

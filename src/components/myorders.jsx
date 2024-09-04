// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrders } from '../slices/orderSlice';

// const MyOrder = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector((state) => state.orders.orders);
//   const [activeTab, setActiveTab] = useState('processing');
//   const [searchQuery, setSearchQuery] = useState('');

//   useEffect(() => {
//     if (['delivered', 'processing', 'cancelled', 'shipped'].includes(activeTab)) {
//       dispatch(getOrders());
//     }
//   }, [activeTab, dispatch]);

//   const handleSearch = () => {
//     const filteredOrders = orders.filter(order => {
//       const nameMatch = order.orderItems.some(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));
//       return nameMatch;
//     });

//     return filteredOrders.filter(order => order.orderStatus === activeTab);
//   };

//   const renderContent = () => {
//     const filteredOrders = handleSearch();

//     if (filteredOrders.length === 0) {
//       return <p className="text-center text-gray-500">No matching orders found.</p>;
//     }

//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full table-auto divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Shipping Address</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Items</th>
//               <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Order Date & Time</th> {/* New column */}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredOrders.map(order => (
//               <tr key={order._id}>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{order.user.name}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.orderStatus}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.paymentMethod}</td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.totalAmount} FRW </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
//                   {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.country}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
//                   <ul className="list-disc pl-4">
//                     {order.orderItems.map(item => (
//                       <li key={item._id}>
//                         {item.name} 
//                         - Quantity: {item.quantity} - Price:{item.price} FRW
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</td> {/* Displaying order date & time */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen mt-24">
//       <div className="max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
//         <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">My Order</h1>
//         <p className="text-gray-700 mb-6">
//           The Buy it Safely is the most safe and convenient way for the deal through KarKelly.
//         </p>
//         <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
//           <button
//             onClick={() => setActiveTab('processing')}
//             className={`pb-1 ${activeTab === 'processing' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
//           >
//             Processing
//           </button>
//           <button
//             onClick={() => setActiveTab('cancelled')}
//             className={`pb-1 ${activeTab === 'cancelled' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
//           >
//             Cancelled
//           </button>
//           <button
//             onClick={() => setActiveTab('delivered')}
//             className={`pb-1 ${activeTab === 'delivered' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
//           >
//             Delivered
//           </button>
//           <button
//             onClick={() => setActiveTab('shipped')}
//             className={`pb-1 ${activeTab === 'shipped' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
//           >
//             Shipped
//           </button>
//         </div>
//         <div className="flex flex-col sm:flex-row items-center mb-6 justify-end space-y-4 sm:space-y-0 sm:space-x-4">
//           <input
//             type="text"
//             placeholder="ex.Item No, Item Name"
//             className="border border-gray-300 rounded-md p-2 flex-1 max-w-full sm:max-w-xs"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//           <div className="flex space-x-2">
//             <button
//               className="bg-blue-950 text-white p-2 rounded-md"
//               onClick={() => handleSearch()}
//             >
//               Search
//             </button>
//           </div>
//         </div>
//         <div className="py-6">
//           {renderContent()}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyOrder;
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../slices/orderSlice';
import { useTranslation } from 'react-i18next';

const MyOrder = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const [activeTab, setActiveTab] = useState('processing');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (['delivered', 'processing', 'cancelled', 'shipped'].includes(activeTab)) {
      dispatch(getOrders());
    }
  }, [activeTab, dispatch]);

  const handleSearch = () => {
    const filteredOrders = orders.filter(order => {
      const nameMatch = order.orderItems.some(item => item.name?.toLowerCase().includes(searchQuery.toLowerCase()));
      return nameMatch;
    });

    return filteredOrders.filter(order => order.orderStatus === activeTab);
  };

  const renderContent = () => {
    const filteredOrders = handleSearch();

    if (filteredOrders.length === 0) {
      return <p className="text-center text-gray-500">{t('myOrders.noOrders')}</p>;
    }

    return (
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.name')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.status')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.paymentMethod')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.totalAmount')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.shippingAddress')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.items')}</th>
              <th className="px-6 py-3 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">{t('myOrders.orderDateTime')}</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm font-medium text-gray-900">{order.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.orderStatus}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{order.totalAmount} FRW</td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {order.shippingInfo.address}, {order.shippingInfo.city}, {order.shippingInfo.country}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  <ul className="list-disc pl-4">
                    {order.orderItems.map(item => (
                      <li key={item._id}>
                        {item.name} 
                        - {t('myOrders.quantity')}: {item.quantity} - {t('myOrders.price')}: {item.price} FRW
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">{t('myOrders.title')}</h1>
        <p className="text-gray-700 mb-6">
          {t('myOrders.description')}
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('processing')}
            className={`pb-1 ${activeTab === 'processing' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            {t('myOrders.processing')}
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-1 ${activeTab === 'cancelled' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            {t('myOrders.cancelled')}
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`pb-1 ${activeTab === 'delivered' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            {t('myOrders.delivered')}
          </button>
          <button
            onClick={() => setActiveTab('shipped')}
            className={`pb-1 ${activeTab === 'shipped' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            {t('myOrders.shipped')}
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder={t('myOrders.searchPlaceholder')}
            className="border border-gray-300 rounded-md p-2 flex-1 max-w-full sm:max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="bg-blue-950 text-white p-2 rounded-md"
              onClick={() => handleSearch()}
            >
              {t('myOrders.searchButton')}
            </button>
          </div>
        </div>
        <div className="py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

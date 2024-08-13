// // src/pages/MyOrders.jsx
// import React from 'react';

// const orders = {
//   processing: [
//     { id: 1, item: 'Laptop', date: '2024-08-01' },
//     { id: 2, item: 'Smartphone', date: '2024-08-05' },
//   ],
//   cancelled: [
//     { id: 3, item: 'Headphones', date: '2024-08-02' },
//   ],
//   completed: [
//     { id: 4, item: 'Keyboard', date: '2024-07-28' },
//     { id: 5, item: 'Mouse', date: '2024-07-30' },
//   ],
// };

// const OrderSection = ({ title, orders }) => (
//   <div className="mb-6 mt-20 ">
//     <h2 className="text-xl font-bold mb-4 text-blue-950">{title}</h2>
//     <ul className="list-decimal pl-5">
//       {orders.length > 0 ? (
//         orders.map((order) => (
//           <li key={order.id} className="mb-2">
//             <div className="flex justify-between items-center p-4 bg-gray-200 rounded-md shadow-md">
//               <span className="font-medium">{order.item}</span>
//               <span className="text-gray-500">{order.date}</span>
//             </div>
//           </li>
//         ))
//       ) : (
//         <li>No orders found</li>
//       )}
//     </ul>
//   </div>
// );

// const MyOrders = () => (
//   <div className="bg-gray-50 min-h-screen">
//     <div className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8">My Orders</h1>
//       <OrderSection title="Processing Orders " orders={orders.processing} />
//       <OrderSection title="Cancelled Orders" orders={orders.cancelled} />
//       <OrderSection title="Completed Orders" orders={orders.completed} />
//     </div>
//   </div>
// );


// export default MyOrders;

import React, { useState } from 'react';

const MyOrder = () => {
  const [activeTab, setActiveTab] = useState('processing');
  const [searchQuery, setSearchQuery] = useState('');
  const [orders, setOrders] = useState([
    { id: 1, name: 'Order 1', vin: 'VIN123', status: 'processing' },
    { id: 2, name: 'Order 2', vin: 'VIN456', status: 'cancelled' },
    { id: 3, name: 'Order 3', vin: 'VIN789', status: 'completed' },
  ]);

  const handleSearch = () => {
    const filteredOrders = orders.filter(order =>
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.vin.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredOrders.filter(order => order.status === activeTab);
  };

  const renderContent = () => {
    const filteredOrders = handleSearch();

    if (filteredOrders.length === 0) {
      return <p className="text-center text-gray-500">No matching orders found.</p>;
    }

    return (
      <ul>
        {filteredOrders.map(order => (
          <li key={order.id} className="text-gray-700 text-center mb-2">
            {order.name} - VIN: {order.vin}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-blue-900 mb-4">My Order</h1>
        <p className="text-gray-700 mb-6">
          The Buy it Safely is the most safe and convenient way for the deal through KarKelly.
        </p>
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('processing')}
            className={`pb-1 ${activeTab === 'processing' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            Processing 0
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`pb-1 ${activeTab === 'cancelled' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            Cancelled 0
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`pb-1 ${activeTab === 'completed' ? 'text-blue-800 border-b-4 border-blue-800' : 'text-gray-400'}`}
          >
            Completed 0
          </button>
        </div>
        <div className="flex items-center mb-6 justify-end">
          <input
            type="text"
            placeholder="ex.Item No, Item Name, VIN No"
            className="border border-gray-300 rounded-md p-2 flex-1 max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-950 text-white p-2 ml-2 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
          <button
            className="bg-gray-100 text-blue-950 p-2 ml-2 rounded-md"
            onClick={() => setSearchQuery('')}
          >
            Reset
          </button>
        </div>
        <div className="py-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;

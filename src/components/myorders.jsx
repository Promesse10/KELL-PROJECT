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
    <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen mt-24">
      <div className="max-w-full sm:max-w-lg md:max-w-3xl lg:max-w-5xl mx-auto bg-white shadow-md rounded-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">My Order</h1>
        <p className="text-gray-700 mb-6">
          The Buy it Safely is the most safe and convenient way for the deal through KarKelly.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
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
        <div className="flex flex-col sm:flex-row items-center mb-6 justify-end space-y-4 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="ex.Item No, Item Name, VIN No"
            className="border border-gray-300 rounded-md p-2 flex-1 max-w-full sm:max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex space-x-2">
            <button
              className="bg-blue-950 text-white p-2 rounded-md"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              className="bg-gray-100 text-blue-950 p-2 rounded-md"
              onClick={() => setSearchQuery('')}
            >
              Reset
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

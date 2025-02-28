import React, { useEffect, useState } from 'react';
import RevenueChart from './components/RevenueChart';
import UserChart from './components/UserChart';
import SubscriberVsNonSubscriber from './components/SubscriberVsNonSubscriber';
import { getChartData } from '../../../services/chartDataService';

const Analytics = () => {
  const [selectedMenu, setSelectedMenu] = useState('monthly');
  const [revenueData, setRevenueData] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [chartColor, setChartColor] = useState('#34D399');
  const [userTypes, setUserTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)

  const handleMenu = (menu) => {
    if (menu !== selectedMenu) {
      setSelectedMenu(menu);
    }
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const response = await getChartData(selectedMenu);
      ("Response", response);

      // Update only after fetching data
      setRevenueData(response.revenueData);
      setCustomerData(response.customerData);
      setUserTypes(response.subscriberDistribution);
    } catch (err) {
      console.error('Error fetching stats:', err.message);

      if (err.message.includes('Authorization token')) {
        setError('Your session has expired. Please log in again.');
      } else {
        setError('Failed to load stats. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const colorMap = {
      monthly: '#34D359',
      quarterly: '#50B631',
      yearly: '#084E7B',
    };
    setChartColor(colorMap[selectedMenu]);
  }, [selectedMenu]);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedMenu]);
  if (error) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-bold mb-4">Session Expired</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => (window.location.href = '/login')}
            className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* Menu Selection */}
      <div className="flex mb-6">
        <div className="flex space-x-4 bg-gray-800 p-2 rounded-lg shadow-md">
          {['monthly', 'quarterly', 'yearly'].map((menu) => (
            <button
              key={menu}
              className={`px-6 py-2 text-sm font-semibold rounded-md transition-all duration-300 
                ${selectedMenu === menu ? 'bg-green-600 text-white shadow-md' : 'text-gray-300 hover:bg-gray-700'}`}
              onClick={() => handleMenu(menu)}
            >
              {menu.charAt(0).toUpperCase() + menu.slice(1)}
            </button>
          ))}
        </div>
      </div>
      {/* Loading State */}
      {loading && !revenueData ? (
        <div className="flex justify-center items-center mt-6">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <div>
          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue Chart */}
            <div className=" p-4 border border-gray-700 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-green-600">Revenue Analytics</h2>
              <RevenueChart revenueData={revenueData} chartColor={chartColor} />
            </div>

            {/* User Chart */}
            <div className=" p-4 border border-gray-700 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-green-600 mb-4">Customer Trends</h2>
              <UserChart customerData={customerData} chartColor={chartColor} />
            </div>
          </div>
          <div className="rounded-xl shadow-md mt-5">
            <h2 className="text-xl font-bold text-green-600 mb-4">Subscribers Overview</h2>
            <SubscriberVsNonSubscriber userTypes={userTypes} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;

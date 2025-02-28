import React, { useState } from 'react';
import { subscribeToPro } from '../../services/subscriptionService';
import { toast } from 'react-toastify';
import Settings from '../adminDashboard/Settings/Settings';

const UserDashboard = () => {
  const [loading, setLoading] = useState(false);

  // Caching localStorage values for better performance
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const plan = 'monthly';
  const amount = 6000;

  const handleSubscription = async () => {
    setLoading(true);
    try {
      const response = await subscribeToPro(userId, plan, amount);
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='text-gray-300 text-3xl'>
        Hi, {userName.trim().split(/[\s,]+/)[0]}
      </div>
      <button
        onClick={handleSubscription}
        className='mt-10 border border-gray-700 p-2 rounded-lg'
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Please wait...' : 'Subscribe To Pro'}
      </button>
      <Settings />
    </div>
  );
};

export default UserDashboard;

import React, { useEffect, useState } from 'react';
import DashboardCard from './components/DashboardCard';
import { getAdminDashboardStats } from '../../../services/adminService';
import PieChart from './components/pieChart';
import { formatIndianRupee } from '../../../utils/formatIndianRupee';
import UsersTable from './components/UsersTable';
import RevenueChart from './components/RevenueChart';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalVisitors: 0,
        totalRevenue: 0,
        productDistribution: [],
        userGrowth: {},
        visitorGrowth: {},
        revenueGrowth: {}
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)

    const fetchStats = async () => {
        try {
            const response = await getAdminDashboardStats();
            setStats(response || {});
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
        fetchStats();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

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
            {/* Statistics Cards Section */}
            <div className="flex justify-between items-center mb-8">
                <DashboardCard
                    title="Users"
                    value={stats.totalUsers || 0}
                    growth={stats.userGrowth.growthValue}
                    growthPercentage={stats.userGrowth.growthPercentage}
                    lastUpdated={stats.userGrowth.lastUpdated}
                />
                <DashboardCard
                    title="Revenue"
                    value={`₹ ${formatIndianRupee(stats.totalRevenue) || 0}`}
                    growth={stats.revenueGrowth.growthValue}
                    growthPercentage={stats.revenueGrowth.growthPercentage}
                    lastUpdated={stats.revenueGrowth.lastUpdated}
                />
                <DashboardCard
                    title="Visits"
                    value={stats.totalVisitors || 0}
                    growth={stats.visitorGrowth.growthValue}
                    growthPercentage={stats.visitorGrowth.growthPercentage}
                    lastUpdated={stats.visitorGrowth.lastUpdated}
                />
            </div>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 ">
                <div className="lg:col-span-2 rounded-lg border border-gray-700">
                    <RevenueChart />
                </div>
                <div className="lg:col-span-1 rounded-lg border border-gray-700">
                    <PieChart pieChartData={stats.productDistribution} />
                </div>
            </div>
            <div>
                <UsersTable />
            </div>
        </div>
    );
};

export default Dashboard;

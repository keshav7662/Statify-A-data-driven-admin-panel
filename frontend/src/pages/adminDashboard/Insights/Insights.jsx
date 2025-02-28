import React, { useEffect, useState } from "react";
import { fetchStockData } from "../../../services/stockService";
import { fetchNewsData } from "../../../services/newsService";
import { fetchUserData } from "../../../services/adminService";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Insights = () => {
    const [stocks, setStocks] = useState([]);
    const [news, setNews] = useState([]);
    const [users, setUsers] = useState([]);
    const [stockIndex, setStockIndex] = useState(0);
    const [newsIndex, setNewsIndex] = useState(0);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes] = await Promise.all([
                    // fetchStockData(),
                    // fetchNewsData(),
                    fetchUserData(),
                ]);
                setStocks([]);
                setNews([]);
                setUsers(userRes.users || []);
            } catch (error) {
                (error)
                if (error.message.includes('Authorization token')) {
                    setError('Your session has expired. Please log in again.');
                } else {
                    setError('Failed to load stats. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("en-GB");
    };
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
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-dots loading-lg"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 rounded-xl shadow-xl text-center">
                    <h3 className="text-lg font-semibold">📊 Total Users</h3>
                    <p className="text-4xl font-bold">{users.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl shadow-xl text-center">
                    <h3 className="text-lg font-semibold">💰 Total User Earnings</h3>
                    <p className="text-4xl font-bold">${users.reduce((sum, user) => sum + (user.earnings || 0), 0)}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-6 rounded-xl shadow-xl text-center">
                    <h3 className="text-lg font-semibold">🔔 Active Subscribers</h3>
                    <p className="text-4xl font-bold">{users.filter(user => user.isSubscriber).length}</p>
                </div>
            </div>

            {/* Stocks & News Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                <div className="border border-gray-500 p-4 rounded-xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-4">📈 Stock Data</h3>
                    {stocks.length > 0 && (
                        <>
                            <div className="flex items-center justify-between">
                                <button onClick={() => setStockIndex((prev) => (prev - 1 + stocks.length) % stocks.length)}>
                                    <FaArrowLeft className="text-gray-400 hover:text-white" />
                                </button>
                                <div className="text-center">
                                    <p className="text-xl font-bold">{stocks[stockIndex].companyName}</p>
                                    <p className="mt-5 text-lg font-semibold text-gray-400">💰 {stocks[stockIndex].currentPrice} | {stocks[stockIndex].netChange} | {stocks[stockIndex].overallRating}</p>
                                </div>
                                <button onClick={() => setStockIndex((prev) => (prev + 1) % stocks.length)}>
                                    <FaArrowRight className="text-gray-400 hover:text-white" />
                                </button>
                            </div>
                            <p className="flex justify-end mt-2 text-green-400 text-lg font-bold">{stockIndex + 1}</p>
                        </>
                    )}

                </div>
                <div className="border border-gray-500 p-4 rounded-xl shadow-xl">
                    <h3 className="text-lg font-semibold mb-4 ">📰 Latest News</h3>
                    {news.length > 0 && (
                        <div className="flex items-center justify-between">
                            <button onClick={() => setNewsIndex((prev) => (prev - 1 + news.length) % news.length)}>
                                <FaArrowLeft className="text-gray-400 hover:text-white" />
                            </button>
                            <div className="text-center mx-4">
                                <a href={news[newsIndex].url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline text-lg font-bold">
                                    {news[newsIndex].title}
                                </a>
                                <p className="text-sm text-gray-400 mt-4">
                                    {news[newsIndex].summary.length > 80
                                        ? news[newsIndex].summary.substring(0, 80) + "...."
                                        : news[newsIndex].summary}
                                    <a href={news[newsIndex].url} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:underline">more</a>
                                </p>
                            </div>
                            <button onClick={() => setNewsIndex((prev) => (prev + 1) % news.length)}>
                                <FaArrowRight className="text-gray-400 hover:text-white" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* User Table */}
            <div className="border border-gray-500 rounded-xl shadow-xl ">
                <h3 className="text-lg font-semibold mb-4 p-3">👤 User Data</h3>
                <div className="overflow-x-auto max-h-[500px]">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-center">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Earnings</th>
                                <th className="p-3">Subscriber</th>
                                <th className="p-3">Start Date</th>
                                <th className="p-3">Expiry Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index} className="border-b border-gray-700 hover:bg-gray-950 text-center">
                                    <td className="p-3">{user.userName}</td>
                                    <td className="p-3">{user.email}</td>
                                    <td className="p-3">{user.role}</td>
                                    <td className="p-3">${user.earnings}</td>
                                    <td className="p-3">{user.isSubscriber ? "Yes" : "No"}</td>
                                    <td className="p-3">{formatDate(user.subscriptionDate)}</td>
                                    <td className="p-3">{formatDate(user.expiry)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Insights;

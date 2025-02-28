import React, { useEffect, useState } from "react";
import { fetchAllSubscribers } from "../../../../services/subscriptionService";

const UsersTable = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [selectedSubscriber, setSelectedSubscriber] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const response = await fetchAllSubscribers();
                setSubscribers(response.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubscribers();
    }, []);

    const handleViewPaymentInfo = (id) => {
        const subscriber = subscribers.find((sub) => sub._id === id);
        if (subscriber) {
            setSelectedSubscriber({
                id: subscriber._id,
                subscriberName: subscriber.userId.userName,
                transactionId: "65d345678tyw3648",
                plan: subscriber.plan,
                amountPaid: subscriber.amountPaid,
                transactionDate: subscriber.startDate,
                paymentGateway: "UPI - PhonePe",
            });
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedSubscriber(null);
    };

    return (
        <div className="relative">
            <div className="border border-gray-700 rounded-lg shadow-md overflow-hidden">
                <h2 className="text-xl font-bold mb-4 border-b border-gray-700 py-2 px-4 text-white">
                    Recent Orders
                </h2>
                
                {/* Responsive Wrapper */}
                <div className="overflow-x-auto">
                    <table className="min-w-full w-full border-collapse">
                        <thead className="bg-gray-900 text-white">
                            <tr>
                                <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">
                                    Username
                                </th>
                                <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">
                                    Plan
                                </th>
                                <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">
                                    UserId
                                </th>
                                <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">
                                    Payment Date
                                </th>
                                <th className="py-3 px-4 text-left font-semibold whitespace-nowrap">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.map((subscriber) => (
                                <tr
                                    key={subscriber._id}
                                    className="text-gray-700 hover:text-white text-sm md:text-base"
                                >
                                    <td className="py-3 px-4 border-b border-gray-700">
                                        {subscriber.userId.userName || "N/A"}
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-700">
                                        {subscriber.plan || "N/A"}
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-700 truncate max-w-[150px]">
                                        {subscriber._id}
                                    </td>
                                    <td className="py-3 px-4 border-b border-gray-700">
                                        {subscriber.startDate}
                                    </td>
                                    <td
                                        className="py-3 px-4 border-b border-gray-700 text-green-600 cursor-pointer hover:underline"
                                        onClick={() => handleViewPaymentInfo(subscriber._id)}
                                    >
                                        View
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center p-4">
                    <div className="bg-gray-950 relative rounded-lg p-6 w-full max-w-md border border-gray-700">
                        <button
                            className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                        <h3 className="text-xl text-green-600 font-bold mb-4 text-center border-b border-gray-800 pb-2">
                            Payment Information
                        </h3>
                        <div className="text-gray-400 space-y-2 text-sm md:text-base">
                            <p>
                                <strong>Transaction ID:</strong> {selectedSubscriber.transactionId}
                            </p>
                            <p>
                                <strong>Payment Gateway:</strong> {selectedSubscriber.paymentGateway}
                            </p>
                            <p>
                                <strong>Name:</strong> {selectedSubscriber.subscriberName}
                            </p>
                            <p>
                                <strong>Plan:</strong> {selectedSubscriber.plan}
                            </p>
                            <p>
                                <strong>Amount Paid:</strong> ₹{selectedSubscriber.amountPaid}
                            </p>
                            <p>
                                <strong>Date:</strong> {selectedSubscriber.transactionDate}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;

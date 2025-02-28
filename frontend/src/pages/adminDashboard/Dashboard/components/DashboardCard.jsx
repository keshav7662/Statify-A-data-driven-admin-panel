import React from 'react';
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const DashboardCard = ({ title, value, growth, growthPercentage, lastUpdated }) => {


    const renderDate = (dateTime) => {
        if (!dateTime) return "N/A";
        const date = new Date(dateTime);
        if (isNaN(date.getTime())) return "N/A";
        return date.toISOString().split("T")[0];
    };

    return (
        <div className="relative w-80 p-6 rounded-lg shadow-md  border  border-gray-700  hover:shadow-green-950  group">
            <FaArrowUpRightFromSquare className='absolute top-6 right-6 text-xl text-white hover:cursor-pointer' />
            <div className="flex flex-col gap-2">
                <h2 className="text-xl font-semibold text-gray-400 group-hover:text-white ">{title}</h2>
                <div className="flex justify-between items-center">
                    <h3 className="text-3xl text-gray-400 group-hover:text-white font-bold shadow-sm">{value}</h3>
                    <div className={`flex items-center ${growth >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {growth >= 0 ? <FaArrowTrendUp size={28} /> : <FaArrowTrendDown size={28} />}
                        <span className="ml-2 text-lg font-semibold">
                            {growthPercentage >= 0 ? `+ ${growthPercentage}%` : `${growthPercentage}%`}
                        </span>
                    </div>
                </div>
                <div className='flex justify-end text-xs text-gray-600'>
                    <span>Last updated: {renderDate(lastUpdated)}</span>
                </div>
            </div>
        </div>
    );
};

export default DashboardCard;

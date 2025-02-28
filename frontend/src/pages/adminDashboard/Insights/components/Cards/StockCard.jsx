import React from 'react';
import { FaArrowTrendUp } from 'react-icons/fa6';

const StockCard = ({ stock }) => {
    return (
        <div className='p-2 border border-gray-700 rounded-md'>
            <div className='flex justify-between mt-2 mb-5'>
                <img src={stock.logoUrl} alt={stock.companyName} className='w-14' />
                <h2 className='font-bold text-lg'>{stock.companyName}</h2>
                <p className='text-gray-500 text-xs font-bold'>{stock.exchangeName}</p>
            </div>
            <div className='flex justify-between items-end'>
                <div className='flex flex-col gap-1'>
                    <p className='text-gray-500 text-sm'>
                        CMP : <span className='font-bold text-gray-400'>{stock.currentPrice}</span>
                    </p>
                    <p className='text-gray-500 text-sm'>
                        PRICE CHG. : <span className='font-bold text-gray-400'>{stock.netChange}</span>
                    </p>
                </div>
                <div className='flex gap-3 items-center text-green-500'>
                    <p className='text-lg font-bold'>{stock.changePercentage}%</p>
                    <FaArrowTrendUp size={22} />
                </div>
            </div>
        </div>
    );
};

export default StockCard;

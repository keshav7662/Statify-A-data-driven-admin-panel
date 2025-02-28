import React from 'react';
import StockForm from './Forms/StockForm';
import NewsForm from './Forms/NewsForm';
import WeatherForm from './Forms/WeatherForm';

const DialogBox = ({ setIsDialogOpen, formType }) => {
    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div>
                {formType === 'Stock' && (
                    <StockForm setIsDialogOpen={setIsDialogOpen} formType={formType} />
                )}
                {formType === 'News' && (
                    <NewsForm setIsDialogOpen={setIsDialogOpen} formType={formType} />
                )}
                {formType === 'Weather' && (
                    <WeatherForm setIsDialogOpen={setIsDialogOpen} formType={formType} />
                )}
            </div>
        </div>
    );
};

export default DialogBox;

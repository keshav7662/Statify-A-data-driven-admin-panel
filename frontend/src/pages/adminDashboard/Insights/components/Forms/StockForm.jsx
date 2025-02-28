import React, { useState } from "react";

const StockForm = ({ onSubmit, setIsDialogOpen, formType }) => {
  const [formData, setFormData] = useState({
    companyName: "",
    stockSymbol: null, // File upload
    currentPrice: 0,
    priceChange: 0,
    percentageChange: 0,
    exchangeName: "",
    country: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload for stock symbol
  const handleFileChange = (e) => {
    setFormData({ ...formData, stockSymbol: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
        onClick={() => setIsDialogOpen(false)}
      >
        Close
      </button>

      <h2 className="text-3xl font-semibold mb-6 text-center">Add {formType}</h2>
      <form onSubmit={handleSubmit} className="grid gap-6">
        {/* Company Name */}
        <div>
          <label className="block text-gray-300">Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full border bg-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Stock Symbol (File Upload) */}
        <div>
          <label className="block text-gray-300">Stock Symbol (Upload) *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border bg-gray-700 rounded-md p-3 text-white focus:outline-none"
            required
          />
        </div>

        {/* Current Price, Price Change, Percentage Change in One Row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-300">Current Price *</label>
            <input
              type="number"
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-3 text-white text-center focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Price Change *</label>
            <input
              type="number"
              name="priceChange"
              value={formData.priceChange}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-3 text-white text-center focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Percentage Change</label>
            <div className="flex items-center border bg-gray-700 rounded-md p-3">
              <input
                type="number"
                name="percentageChange"
                value={formData.percentageChange}
                onChange={handleChange}
                className="w-full bg-transparent  text-center text-white outline-none"
              />
              <span className="border-l border-gray-500 px-3 text-gray-400">%</span>
            </div>
          </div>
        </div>

        {/* Two-Column Layout for Exchange Name & Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300">Exchange Name *</label>
            <input
              type="text"
              name="exchangeName"
              value={formData.exchangeName}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-md w-1/4 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockForm;

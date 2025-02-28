import React, { useState } from "react";

const WeatherForm = ({ onSubmit, setIsDialogOpen, formType }) => {
  const [formData, setFormData] = useState({
    city: "",
    country: "",
    temperature: "",
    condition: "",
    humidity: "",
    windSpeed: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
        onClick={() => setIsDialogOpen(false)}
      >
        Close
      </button>

      <h2 className="text-3xl font-semibold mb-4 text-center">Add {formType}</h2>

      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* City and Country in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
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
              className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        </div>

        {/* Temperature and Condition in two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300">Temperature (°C) *</label>
            <input
              type="number"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-300">Condition *</label>
            <input
              type="text"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
        </div>

        {/* Humidity and Wind Speed in two columns (optional fields) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300">Humidity (%)</label>
            <input
              type="number"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-gray-300">Wind Speed (km/h)</label>
            <input
              type="number"
              name="windSpeed"
              value={formData.windSpeed}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white text-center focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-md font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeatherForm;

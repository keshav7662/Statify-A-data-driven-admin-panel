import React, { useState } from "react";

const NewsForm = ({ onSubmit, setIsDialogOpen, formType }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    newsImg: null, // File upload
    category: "",
    country: "",
  });

  // News categories
  const newsCategories = [
    "Sports",
    "Entertainment",
    "Politics",
    "Technology",
    "Health",
    "Business",
    "Science",
    "World",
    "Education",
    "Environment",
  ];

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, newsImg: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto relative">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full"
        onClick={() => setIsDialogOpen(false)}
      >
        Close
      </button>

      <h2 className="text-3xl font-semibold mb-4 text-center">Add {formType}</h2>
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Title - full width */}
        <div>
          <label className="block text-gray-300">Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        {/* Content - full width */}
        <div>
          <label className="block text-gray-300">Content *</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            required
          />
        </div>

        {/* News Image Upload - full width */}
        <div>
          <label className="block text-gray-300">News Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none"
            required
          />
        </div>

        {/* Category and Country - two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category Dropdown */}
          <div>
            <label className="block text-gray-300">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border bg-gray-700 rounded-md p-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select a category</option>
              {newsCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          {/* Country */}
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

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-md font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;

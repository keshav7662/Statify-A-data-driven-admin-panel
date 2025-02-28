import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    temperature: {
      type: Number,
      required: true, // Temperature in Celsius (or Kelvin/Fahrenheit based on preference)
    },
    condition: {
      type: String,
      required: true, // Weather description (e.g., Sunny, Rainy)
    },
    humidity: {
      type: Number, // Percentage
      default: 0,
    },
    windSpeed: {
      type: Number, // Wind speed in km/h or mph
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlatformUser', // Admin who added the weather update
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Weather', weatherSchema);

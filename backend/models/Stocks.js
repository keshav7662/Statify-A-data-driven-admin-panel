import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    stockSymbol: {
      type: String,
      required: true,
      unique: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    change: {
      type: Number, 
      default: 0,
    },
    exchangeName:{
      type:String,
      required:true
    },
    percentageChange: {
      type: Number, 
      default: 0,
    },
    country: {
      type: String,
      required: true, 
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PlatformUser', 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Stock', stockSchema);

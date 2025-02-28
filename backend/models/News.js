import mongoose from "mongoose";
import { nonEmptyStringValidator } from "../validators/nonEmptyStringValidators.js";

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    newsImg: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
}, { timestamps: true })

export default mongoose.model('News', newsSchema);
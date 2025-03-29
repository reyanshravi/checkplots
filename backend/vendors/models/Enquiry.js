// models/Enquiry.js
import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
    },
    phone: {
        type: String,
        required: false,
    },
    message: {
        type: String,
        required: true,
    },
    scheduleDate: {
        type: Date,
        required: false,
    },
    category: {
        type: String,
        required: true,
        enum: ['Hotel', 'Interior', 'Property'],
    },
    categoryId: {
        type: String,
        required: true,
        unique: true,
    }
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);

export default Enquiry;

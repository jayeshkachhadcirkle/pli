// models/Enquiry.js
const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    type: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    source: { type: String, required: true },
    status: { type: Number, required: true, enum: [0, 1] }, // 0: Inactive, 1: Active
    enquiry_date: { type: Date, default: Date.now },
    followup_date: { type: Date },
    notes: { type: String },
    image: { type: String } // Assuming this is the URL or file path of the image
}, { timestamps: true });

module.exports = mongoose.model('EnquiryModel', enquirySchema);

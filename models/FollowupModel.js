const mongoose = require('mongoose');

// Create the Follow-up Schema
const followUpSchema = new mongoose.Schema(
    {
        enquiry_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EnquiryModel', // Assuming you have an Enquiry model to link with
            required: true,
        },
        enquiry_date: {
            type: Date,
            required: true,
        },
        last_followup_date: {
            type: Date,
            required: true,
        },
        next_followup_date: {
            type: Date,
            required: true,
        },
        image: {
            type: String, // URL or path to the image
            default: null,
        },
        notes: {
            type: String,
            default: '',
        },
        status: {
            type: Number,
            enum: [0, 1], // 0: closed, 1: followup
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
    }
);

// Create the Follow-up model
const FollowupModel = mongoose.model('FollowupModel', followUpSchema);

module.exports = FollowupModel;

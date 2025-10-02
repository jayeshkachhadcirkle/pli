// controllers/enquiryController.js
const Enquiry = require('../models/EnquiryModel');

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();
        res.status(201).json(enquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all enquiries
exports.getAllEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find();
        res.status(200).json(enquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific enquiry by ID
exports.getEnquiryById = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update an enquiry
exports.updateEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.status(200).json(enquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete an enquiry
exports.deleteEnquiry = async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
        if (!enquiry) return res.status(404).json({ message: 'Enquiry not found' });
        res.status(200).json({ message: 'Enquiry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

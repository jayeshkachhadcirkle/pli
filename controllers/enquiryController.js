// controllers/enquiryController.js
const Enquiry = require('../models/EnquiryModel');
const FollowUp = require('../models/FollowupModel'); // Import the Follow-up model

// Create a new enquiry
exports.createEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body);
        await enquiry.save();

        const newFollowUp = new FollowUp({
            enquiry_id: enquiry._id,
            user_id: req.user.id, // Assuming req.user is set by authentication middleware
            enquiry_date: enquiry.enquiry_date,
            last_followup_date: enquiry.followup_date,
            next_followup_date: enquiry.followup_date,
            image: enquiry.image,
            notes: enquiry.notes,
            status: enquiry.status,
        });

        // Save the follow-up to the database
        await newFollowUp.save();

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

// Get enquiries for the logged-in user
exports.getUserEnquiries = async (req, res) => {
    try {
        console.log(req.user);
        const enquiries = await Enquiry.find({ user_id: req.user.id });
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

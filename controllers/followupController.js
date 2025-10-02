const FollowUp = require('../models/FollowupModel'); // Import the Follow-up model

// Create a new follow-up
exports.createFollowUp = async (req, res) => {
    try {
        const { enquiry_id, enquiry_date, last_followup_date, next_followup_date, image, notes, status } = req.body;

        // Create a new follow-up instance
        const newFollowUp = new FollowUp({
            enquiry_id,
            enquiry_date,
            last_followup_date,
            next_followup_date,
            image,
            notes,
            status,
        });

        // Save the follow-up to the database
        await newFollowUp.save();

        res.status(201).json({
            message: 'Follow-up created successfully',
            data: newFollowUp,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all follow-ups
exports.getFollowUps = async (req, res) => {
    try {
        const followUps = await FollowUp.find().populate('enquiry_id'); // Populate the enquiry_id field with the actual enquiry data
        res.status(200).json({
            message: 'Follow-ups fetched successfully',
            data: followUps,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific follow-up by ID
exports.getFollowUpById = async (req, res) => {
    try {
        const followUp = await FollowUp.findById(req.params.id).populate('enquiry_id');
        if (!followUp) {
            return res.status(404).json({ message: 'Follow-up not found' });
        }
        res.status(200).json({
            message: 'Follow-up fetched successfully',
            data: followUp,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a follow-up
exports.updateFollowUp = async (req, res) => {
    try {
        const followUp = await FollowUp.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated document
        );

        if (!followUp) {
            return res.status(404).json({ message: 'Follow-up not found' });
        }

        res.status(200).json({
            message: 'Follow-up updated successfully',
            data: followUp,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a follow-up
exports.deleteFollowUp = async (req, res) => {
    try {
        const followUp = await FollowUp.findByIdAndDelete(req.params.id);
        if (!followUp) {
            return res.status(404).json({ message: 'Follow-up not found' });
        }
        res.status(200).json({
            message: 'Follow-up deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

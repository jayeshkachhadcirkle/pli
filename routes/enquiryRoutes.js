// routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');

// Create a new enquiry
router.post('/', enquiryController.createEnquiry);

// Get all enquiries
router.get('/', enquiryController.getAllEnquiries);

// Get a specific enquiry by ID
router.get('/:id', enquiryController.getEnquiryById);

// Update an enquiry by ID
router.put('/:id', enquiryController.updateEnquiry);

// Delete an enquiry by ID
router.delete('/:id', enquiryController.deleteEnquiry);

module.exports = router;

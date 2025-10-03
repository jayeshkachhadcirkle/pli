// routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const enquiryController = require('../controllers/enquiryController');
const authenticate = require('../authenticate');

// Create a new enquiry
router.post('/', authenticate, enquiryController.createEnquiry);

// Get all enquiries
router.get('/', authenticate, enquiryController.getUserEnquiries);

// Get a specific enquiry by ID
router.get('/:id', authenticate, enquiryController.getEnquiryById);

// Update an enquiry by ID
router.put('/:id', authenticate, enquiryController.updateEnquiry);

// Delete an enquiry by ID
router.delete('/:id', authenticate, enquiryController.deleteEnquiry);

// Test route to check authentication

module.exports = router;

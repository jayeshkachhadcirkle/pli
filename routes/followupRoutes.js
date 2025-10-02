const express = require('express');
const router = express.Router();
const followUpController = require('../controllers/followupController');

// Route to create a new follow-up
router.post('/followup', followUpController.createFollowUp);

// Route to get all follow-ups
router.get('/followup', followUpController.getFollowUps);

// Route to get a specific follow-up by ID
router.get('/followup/:id', followUpController.getFollowUpById);

// Route to update a follow-up
router.put('/followup/:id', followUpController.updateFollowUp);

// Route to delete a follow-up
router.delete('/followup/:id', followUpController.deleteFollowUp);

module.exports = router;

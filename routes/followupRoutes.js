const express = require('express');
const router = express.Router();
const followUpController = require('../controllers/followupController');

// Route to create a new follow-up
router.post('/', followUpController.createFollowUp)
// Route to get all follow-ups
router.get('/', followUpController.getFollowUps);

// Route to get a specific follow-up by ID
router.get('/:id', followUpController.getFollowUpById);

// Route to update a follow-up
router.put('/:id', followUpController.updateFollowUp);

// Route to delete a follow-up
router.delete('/:id', followUpController.deleteFollowUp);

module.exports = router;

const express = require('express');
const router = express.Router();
const followUpController = require('../controllers/followupController');
const authenticate = require('../authenticate');

// Route to create a new follow-up
router.post('/', authenticate, followUpController.createFollowUp)
// Route to get all follow-ups
// router.get('/', followUpController.getFollowUps);
router.get('/', authenticate, followUpController.getUserFollowups);

// Route to get a specific follow-up by ID
router.get('/:id', authenticate, followUpController.getFollowUpById);

// Route to update a follow-up
router.put('/:id', authenticate, followUpController.updateFollowUp);

// Route to delete a follow-up
router.delete('/:id', authenticate, followUpController.deleteFollowUp);

module.exports = router;

// routes/users.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById, verifyToken } = require('../controllers/usersController');
const authenticate = require('../authenticate');

// Public routes
router.post('/register', createUser);  // Register new user
router.post('/login', loginUser);      // Login user

// Protected routes (Require JWT verification)
// router.get('/', verifyToken, getAllUsers);  // Get all users
// router.get('/:id', getUserById); // Get user by ID
router.get('/:id', authenticate, getUserById); // Get user by ID
router.put('/:id', authenticate, updateUserById); // Update user
router.delete('/:id', authenticate, deleteUserById); // Delete user
router.get('/test/auth', authenticate, (req, res) => {
    res.json({ user: req.user });
});

module.exports = router;

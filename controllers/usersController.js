// controllers/usersController.js
const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// CREATE: Add a new user
// const createUser = async (req, res) => {
//     const { name, email, phone, password } = req.body;

//     try {
//         const user = new User({ name, email, phone, password, createdAt: new Date(), updatedAt: new Date() });
//         await user.save();

//         const token = jwt.sign(
//             { id: user._id, email: user.email },
//             process.env.JWT_SECRET,
//             { expiresIn: process.env.JWT_EXPIRATION }
//         );

//         res.cookie('jwt', token, {
//             httpOnly: true,   // Can't be accessed via JavaScript
//             secure: true,     // Use this in production (only over HTTPS)
//             maxAge: 3600000,  // Expiry time in milliseconds (e.g., 1 hour)
//             sameSite: 'Strict', // Optional: Prevent CSRF attacks
//         });

//         res.cookie('user_id', user._id, {
//             httpOnly: false,  // Can be accessed via JavaScript (for use in front-end)
//             secure: true,     // Use this in production (only over HTTPS)
//             maxAge: 3600000,  // Expiry time in milliseconds
//             sameSite: 'Strict', // Optional: Prevent CSRF attacks
//         });

//         res.status(201).json({ user, token: token }); // Return the created user
//     } catch (error) {
//         res.status(400).json({ message: 'Error creating user', error });
//     }
// };



const createUser = async (req, res) => {
    const { name, email, phone, password } = req.body;

    try {
        const user = new User({
            name, email, phone, password,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await user.save();

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        // Detect if request is from Electron
        const isElectron = req.headers['user-agent']?.includes('Electron');

        res.cookie('jwt', token, {
            httpOnly: false,
            secure: false,
            maxAge: 3600000,
            sameSite: 'Lax',
        });

        res.cookie('user_id', user._id, {
            httpOnly: false,
            secure: false, // Disable secure in Electron
            maxAge: 3600000,
            sameSite: 'Lax',
        });

        res.status(201).json({ user, token: token });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
};


// LOGIN: Authenticate user and generate JWT
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRATION }
        );

        const userData = {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        }

        //  Secure
        // res.cookie('jwt', token, {
        //     httpOnly: true,   // Can't be accessed via JavaScript
        //     secure: true,     // Use this in production (only over HTTPS)
        //     maxAge: 3600000,  // Expiry time in milliseconds (e.g., 1 hour)
        //     sameSite: 'Strict', // Optional: Prevent CSRF attacks
        // });

        // res.cookie('user_id', user._id, {
        //     httpOnly: false,  // Can be accessed via JavaScript (for use in front-end)
        //     secure: true,     // Use this in production (only over HTTPS)
        //     maxAge: 3600000,  // Expiry time in milliseconds
        //     sameSite: 'Strict', // Optional: Prevent CSRF attacks
        // });

        res.cookie('jwt', token, {
            httpOnly: false,   // Can't be accessed via JavaScript
            secure: false,     // Use this in production (only over HTTPS)
            maxAge: 3600000,  // Expiry time in milliseconds (e.g., 1 hour)
            sameSite: 'None', // Optional: Prevent CSRF attacks
        });

        res.cookie('user_id', user._id, {
            httpOnly: false,  // Can be accessed via JavaScript (for use in front-end)
            secure: false,     // Use this in production (only over HTTPS)
            maxAge: 3600000,  // Expiry time in milliseconds
            sameSite: 'None', // Optional: Prevent CSRF attacks
        });

        res.status(200).json({ message: 'Login successful', token, user: userData });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in user', error });
    }
};

// READ: Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // Return all users
    } catch (error) {
        res.status(400).json({ message: 'Error fetching users', error });
    }
};

// READ: Get a single user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Return the user by ID
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user', error });
    }
};

// UPDATE: Update a user by ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, password } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, email, phone, password, updatedAt: new Date() }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user); // Return the updated user
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// DELETE: Delete a user by ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Access denied, token required' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid or expired token' });
    }
};

module.exports = {
    createUser,
    loginUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    verifyToken,
};

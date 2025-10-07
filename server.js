// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
// const authenticate = require('./authenticate');
// In your backend server setup
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(express.json());

app.use(cookieParser());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(cors({
    origin: 'http://localhost:4400',
    credentials: true // Allow cookies to be sent
}));

const userRoutes = require('./routes/userRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const followupRoutes = require('./routes/followupRoutes');


app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', userRoutes);
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/followup', followupRoutes);



app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
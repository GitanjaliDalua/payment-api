require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();

// Security Middleware
app.use(helmet());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: process.env.API_RATE_LIMIT || 100
});
app.use(limiter);

// ---> PASTE THE MONGODB CONNECTION CODE HERE <---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Connection error:', err));

// Routes
app.use('/api/payments', require('./routes/payments'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Payment processing failed' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Payment API running on port ${PORT}`));
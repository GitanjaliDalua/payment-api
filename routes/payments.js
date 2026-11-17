const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const paymentValidator = require('../validators/paymentValidator');

// 1. POST route to save a new payment
router.post('/', async (req, res) => {
    try {
        const { error } = paymentValidator.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const payment = new Payment(req.body);
        await payment.save();

        res.status(201).json({ message: 'Payment processed successfully', paymentId: payment._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error during payment processing' });
    }
});

// 2. GET route to retrieve all saved payments
router.get('/', async (req, res) => {
    try {
        const payments = await Payment.find().sort({ createdAt: -1 });
        res.status(200).json(payments);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching payments' });
    }
});

// 3. GET route to retrieve a single payment by its ID
router.get('/:id', async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json(payment);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while fetching payment' });
    }
});

// 4. DELETE route to remove a payment by its ID
router.delete('/:id', async (req, res) => {
    try {
        const payment = await Payment.findByIdAndDelete(req.params.id);
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error while deleting payment' });
    }
});

module.exports = router;
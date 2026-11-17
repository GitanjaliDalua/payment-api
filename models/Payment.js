const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardHolder: { type: String, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true, default: 'USD' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
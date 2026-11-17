const Joi = require('joi');

const paymentSchema = Joi.object({
    cardNumber: Joi.string().creditCard().required(),
    cardHolder: Joi.string().min(3).max(50).required(),
    expiryDate: Joi.string().pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/).required(),
    cvv: Joi.string().pattern(/^\d{3,4}$/).required(),
    amount: Joi.number().positive().precision(2).required(),
    currency: Joi.string().valid('USD', 'EUR', 'GBP').required()
});

module.exports = paymentSchema;
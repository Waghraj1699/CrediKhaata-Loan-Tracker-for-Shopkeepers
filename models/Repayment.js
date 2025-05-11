const mongoose = require('mongoose');
const moment = require('moment');

const RepaymentSchema = new mongoose.Schema({
    loan: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan', required: true },
    amount: { type: Number, required: true, min: 1 }, // Ensure repayment amount is valid
    date: { type: String, default: () => moment().format("YYYY-MM-DD") }
});

module.exports = mongoose.model('Repayment', RepaymentSchema);

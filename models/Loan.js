const mongoose = require('mongoose');
const moment = require('moment');

// Define Loan Schema
const LoanSchema = new mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 1 }, // Amount must be greater than 0
    issueDate: { type: String, default: () => moment().format("YYYY-MM-DD") }, // Stores date only
    dueDate: { type: String, required: true }, // Must be passed in API request
    frequency: { type: String, enum: [ "bi-weekly", "monthly" ], required: true }, //  Restrict values
    interest: { type: Number, default: 0, min: 0 }, 
    graceDays: { type: Number, default: 0, min: 0, max: 30 }, // Max grace period set to 30 days
    status: { type: String, enum: ["pending", "paid", "overdue"], default: "pending" } // Allow only valid statuses
});

module.exports = mongoose.model('Loan', LoanSchema);

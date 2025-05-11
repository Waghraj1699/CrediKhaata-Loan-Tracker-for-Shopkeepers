const mongoose = require('mongoose');

// Define Customer Schema
const CustomerSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    address: String,
    trustScore: { type: Number, default: 50 },
    creditLimit: Number
});

module.exports = mongoose.model('Customer', CustomerSchema);

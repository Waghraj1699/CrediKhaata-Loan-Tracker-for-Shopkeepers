const mongoose = require('mongoose');
const Loan = require('../models/Loan');
const moment = require('moment');

// Create a New Loan
const createLoan = async (req, res) => {
    try {
        const loanData = { ...req.body, user: req.userId };
        console.log("Loan Data Received:", loanData);

        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(req.body.customer) || !mongoose.Types.ObjectId.isValid(req.body.user)) {
            console.error("Error: Invalid Customer/User ID format.");
            return res.status(400).json({ error: "Invalid Customer/User ID format." });
        }

        // Validate loan amount
        if (loanData.amount <= 0) {
            console.error("Error: Loan amount must be greater than zero.");
            return res.status(400).json({ error: "Loan amount must be greater than zero." });
        }

        // Set issue date & due date based on frequency
        loanData.issueDate =  moment().format("YYYY-MM-DD");
        loanData.dueDate = moment().add(loanData.frequency === "bi-weekly" ? 14 : 30, "days").format("YYYY-MM-DD");
        
        // Save new loan
        const loan = new Loan(loanData);
        await loan.save();
        console.log(`Loan Created Successfully: ${loan._id}`);

        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        console.error("Loan creation error:", error); 
        res.status(400).json({ error: "Internal Server Error while creating loan." });
    }
};

const getLoans = async (req, res) => {
    try {
        console.log(`Fetching loans for user: ${req.userId}`);
        
        const {status} = req.query;
        let filter = { user: req.userId};
        if (status) {
            filter.status = status
        }

        // Fetch loans and populate customer details
        const loans = await Loan.find(filter).populate('customer', 'name phone').lean();

        if (!loans.length) {
            console.warn("No Loans Found.");
            return res.status(404).json({ message: "No loans found." });
        }

        console.log(`Loans Retrieved: ${loans.length}`);
        res.status(200).json(loans);
    } catch (error) {
        console.error("Error Fetching Loans:", error.message);
        res.status(500).json({ error: "Internal Server Error while fetching loans." });
    }
};

module.exports = { createLoan, getLoans };

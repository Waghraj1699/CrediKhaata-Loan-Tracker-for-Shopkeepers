// controllers/repaymentController.js
const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const moment = require('moment');
const { generateRepaymentPDF } = require('../utils/pdfGenerator');  


module.exports =  {handleRepaymentWebhook: async (req, res) => {
        try {
            console.log("Webhook received for repayment");

            const { loanId, amount, secret} = req.body;
            console.log("Received Data:", { loanId, amount });

            // Optional: basic webhook secret verification
            const EXPECTED_SECRET = process.env.WEBHOOK_SECRET;
            if (secret !== EXPECTED_SECRET) {
                return res.status(403).json({ error: "Unauthorized webhook request" });
            }

            // Validation: Ensure loanId and amount are provided
            if (!loanId || !amount) {
                console.log("Missing loanId or amount");
                return res.status(400).json({ error: "Loan ID and amount are required." });
            }

            // Validate amount format
            if (isNaN(amount) || amount <= 0) {
                console.log("Invalid repayment amount:", amount);
                return res.status(400).json({ error: "Invalid repayment amount. Must be a positive number." });
            }

            // Find the loan
            const loan = await Loan.findById(loanId).populate('customer', 'name phone');
            console.log("Fetched Loan:", loan);

            if (!loan) {
                console.log("Loan not found!");
                return res.status(404).json({ error: "Loan not found." });
            }

            // Prevent repayment if the loan is already fully repaid
            if (loan.amount <= 0) {
                console.log("Loan already repaid! No further payments allowed.");
                return res.status(400).json({ error: "Loan is fully repaid. No further payments allowed." });
            }

            // Prevent repayment amount from exceeding loan balance
            if (amount > loan.amount) {
                console.log("Repayment amount exceeds loan balance!");
                return res.status(400).json({ error: "Repayment amount cannot exceed remaining loan balance." });
            }

            // Record repayment
            const repaymentDate = moment().format("YYYY-MM-DD");
            const repayment = new Repayment({ loan: loanId, amount, date: repaymentDate });
            await repayment.save();
            console.log("Repayment saved:", repayment);

            // Update loan balance
            loan.amount -= amount;
            await loan.save();
            console.log("Updated Loan Balance:", loan.amount);

            // Generate PDF receipt
            const pdfPath = await generateRepaymentPDF({
                loan: loanId,
                customerName: loan.customer.name,
                customerPhone: loan.customer.phone,
                amount,
                date: new Date().toISOString().split("T")[0],
                _id: repayment._id
            });

            res.status(201).json({
                message: "Repayment processed via webhook",
                repayment,
                pdfReceipt: pdfPath
            });

        } catch (error) {
            console.error("Webhook processing failed:", error);
            res.status(500).json({ error: "Internal error processing repayment webhook" });
        }
    }} ;

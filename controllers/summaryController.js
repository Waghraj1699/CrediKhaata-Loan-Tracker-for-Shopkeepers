const Loan = require('../models/Loan');
const Repayment = require('../models/Repayment');
const moment = require('moment');

const getLoanSummary = async (req, res) => {
    try {
        console.log("Fetching loan summary...");

        // Get all loans that are not yet paid
        const loans = await Loan.find({user: req.userId,status: { $ne: "paid" } }).lean();
        console.log("Loans Found:", loans.length);

        // Extract loan IDs of this user
         const userLoanIds = loans.map(loan => loan._id);
         console.log(userLoanIds)

        // Get all repayments
        const repayments = await Repayment.find({ loan: { $in: userLoanIds } }).lean();
        console.log("Repayments Found:", repayments.length);
       
        // Calculate total amounts
        const totalLoaned = loans.reduce((sum, loan) => sum + loan.amount, 0) || 0;
        const totalCollected = repayments.reduce((sum, repayment) => sum + repayment.amount, 0) || 0;
        console.log("Total Loaned:", totalLoaned);
        console.log("Total Collected:", totalCollected);

        
        // Get current date (start of day for accurate filtering)
        const today = moment().startOf("day").toDate();
        console.log("Current Date:", today);
        
        // Get overdue loans
        const overdueLoans = await Loan.find({ 
                    user: req.userId,
                    dueDate: { $lt: today}, 
                    status: 'pending' 
                }).populate('customer', 'name phone').lean();
        console.log("Overdue Loans Found:", overdueLoans.length);

        // Calculate overdue amount
        const overdueAmount = overdueLoans.reduce((sum, loan) => sum + loan.amount, 0) || 0;
        console.log("Overdue Amount:", overdueAmount);
        
         // Send response
         res.json({
            totalLoaned,
            totalCollected,
            overdueAmount,
            overdueLoansCount: overdueLoans.length
        });
    } catch (error) {
        console.error("Error Fetching Loan Summary:", error.message);
        res.status(500).json({ error: "Internal Server Error while fetching loan summary." });
    }
};

module.exports = { getLoanSummary };

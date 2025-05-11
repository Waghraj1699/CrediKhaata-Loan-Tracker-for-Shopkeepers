const Loan = require('../models/Loan');
const moment = require('moment');

// 🔹 Auto-Tag Overdue Loans
const autoTagOverdueLoans = async () => {
    try {
        console.log("Running overdue loan auto-tagging job...");

        const today = moment().startOf("day").toDate();
        console.log("Current Date:", today);

        // Find and update overdue loans
        const overdueLoans = await Loan.updateMany(
            { dueDate: { $lt: today }, status: "pending" },
            { $set: { status: "overdue" } }
        );

        console.log(`Overdue Loans Updated: ${overdueLoans.modifiedCount}`);
    } catch (error) {
        console.error("Error in Auto-Tagging Overdue Loans:", error.message);
    }
};

const getOverdueLoans = async (req, res) => {
    try {
        console.log("Fetching overdue loans...");

        // Get current date (start of day for accurate filtering)
        const today = moment().startOf("day").toDate();
        console.log("Current Date:", today);

        // Find loans where dueDate is before today & status is pending
        const overdueLoans = await Loan.find({ 
            user: req.userId,
            dueDate: { $lt: today}, 
            status: 'pending' 
        }).populate('customer', 'name phone').lean();

        console.log("Overdue Loans Found:", overdueLoans.length);

        if (overdueLoans.length === 0) {
            console.log("No overdue loans found.");
            return res.status(200).json({ message: "No overdue loans at the moment." });
        }

        // Format response for better readability
        const formattedLoans = overdueLoans.map(loan => ({
            customerName: loan.customer.name,
            phone: loan.customer.phone,
            amountDue: loan.amount,
            dueDate: loan.dueDate
        }));

        console.log("Sending overdue loan data...");
        res.status(200).json(formattedLoans);
    } catch (error) {
        console.error("Error fetching overdue loans:", error);
        res.status(500).json({ error: "Error fetching overdue loans. Please try again later." });
    }
};

module.exports = { getOverdueLoans , autoTagOverdueLoans};

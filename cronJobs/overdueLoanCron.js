const cron = require("node-cron");
const { autoTagOverdueLoans } = require('../controllers/overdueController');

console.log("Overdue Loan Auto-Tagging Job Loaded");

// Schedule job to run daily at midnight
cron.schedule("0 0 * * *", async () => {
    console.log("Running daily auto-tagging for overdue loans...");
    await autoTagOverdueLoans();
});

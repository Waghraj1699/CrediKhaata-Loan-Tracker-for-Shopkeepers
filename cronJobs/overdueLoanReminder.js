const cron = require('node-cron');
const Loan = require('../models/Loan');
const moment = require('moment');
const { sendMockSms, sendMockWhatsAppMessage } = require('../utils/notifications');

console.log("Cron Job Script Loaded");

cron.schedule("*/2 * * * *", async () => { // Runs daily at 9 AM
    console.log("Running overdue loan reminder job...");

    try {
        // Get the current date (ONLY date, no time)
        const today = moment().format("YYYY-MM-DD"); 
        console.log("Current Date:", today);
    
        const overdueLoans = await Loan.find({ 
                    dueDate: { $lt: new Date(today)}, 
                    status: 'pending' 
                }).populate('customer', 'name phone');

        if (overdueLoans.length > 0) {
            overdueLoans.forEach(async (loan) => {
                const reminderMessage = `Hello ${loan.customer.name}, your loan of ₹${loan.amount} is overdue. Please repay to avoid penalties.`;

                // Send Mock SMS and WhatsApp reminders
                sendMockSms(loan.customer.phone, reminderMessage);
                sendMockWhatsAppMessage(loan.customer.phone, reminderMessage);
            });
        } else {
            console.log("No overdue loans today.");
        }
    } catch (error) {
        console.error("Error sending reminders:", error.message);
    }
});

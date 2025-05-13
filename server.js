// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


const authRoutes = require('./routes/authRoutes')
const customerRoutes = require('./routes/customerRoutes');
const loanRoutes = require('./routes/loanRoutes');
const overdueRoutes = require('./routes/overdueRoutes')
const summaryRoutes = require('./routes/summaryRoutes')
const repaymentRoutes = require('./routes/webhookRoutes')

dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());
app.use(cors());

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            serverSelectionTimeoutMS: 10000, // Increase timeout to 90 seconds
            socketTimeoutMS: 60000 // Increase socket timeout
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

connectDB(); 

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/loans', loanRoutes)
app.use('/api/overdue', overdueRoutes)
app.use('/api/summary', summaryRoutes)
app.use('/api/webhook', repaymentRoutes)

app.use("/",(req, res) => {
    res.json({message: "Hello CrediKhata"})
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


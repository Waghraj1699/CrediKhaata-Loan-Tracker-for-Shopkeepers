# CrediKhaata - Loan Tracker for Shopkeepers

**CrediKhaata** is a backend application designed to help shopkeepers manage and track customer loans efficiently. It provides a RESTful API for handling customer records, loan details, and repayment histories.

## 🚀 Features

- **Customer Management**: Add, update, and delete customer information.
- **Loan Tracking**: Record loan amounts, due dates, and repayment schedules.
- **Repayment History**: Maintain a history of repayments made by customers.
- **Automated Reminders**: Send reminders to customers about upcoming or overdue payments.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing application data.
- **Mongoose**: ODM for MongoDB and Node.js.
- **dotenv**: Module to load environment variables from a `.env` file.
- **jsonwebtoken**: Secure authentication using JWT.
- **moment**: Date manupulation for loan scheduling.
- **cron**: Scheduled auto-tagging of overdue loans.
- **twilio**: SMS notification for loan repayment.
- **pdfkit**: PDF generation for repayment receipts. 

## 📦 Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Waghraj1699/CrediKhaata-Loan-Tracker-for-Shopkeepers.git
   cd CrediKhaata-Loan-Tracker-for-Shopkeepers
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the server**:

   ```bash
   node server.js
   ```

   The server will start on `http://localhost:3000`.

## 📚 API Endpoints

### Authentication
- **POST /auth/register**: Register a new user.
- **POST /auth/login**: Authenticate a user and return a token.

### Customers

- **GET /get**: Retrieve all customers.
- **POST /create**: Add a new customer.
- **PUT /update/:id**: Update customer details.
- **DELETE /delete/:id**: Delete a customer.

### Loans

- **GET /fetch**: Retrieve all loans.
- **POST /credit**: Add a new loan.

### Repayments

- **POST /repayment**: Add a new repayment.

### Summary

- **GET /**: Generate a report of all loans.

### Overdue loans 

- **GET /loans**: Retrive all overdue loans
  
## 📌 Notes

- Ensure MongoDB is running and accessible via the connection string provided in the `.env` file.
- Scheduled tasks for sending reminders are set up using Node.js cron jobs.

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
- **Nodemailer**: Module for sending emails from Node.js applications.
- **dotenv**: Module to load environment variables from a `.env` file.

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
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_email_password
   ```

4. **Start the server**:

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## 📚 API Endpoints

### Customers

- **GET /customers**: Retrieve all customers.
- **GET /customers/:id**: Retrieve a customer by ID.
- **POST /customers**: Add a new customer.
- **PUT /customers/:id**: Update customer details.
- **DELETE /customers/:id**: Delete a customer.

### Loans

- **GET /loans**: Retrieve all loans.
- **GET /loans/:id**: Retrieve a loan by ID.
- **POST /loans**: Add a new loan.
- **PUT /loans/:id**: Update loan details.
- **DELETE /loans/:id**: Delete a loan.

### Repayments

- **GET /repayments**: Retrieve all repayments.
- **GET /repayments/:id**: Retrieve a repayment by ID.
- **POST /repayments**: Add a new repayment.
- **PUT /repayments/:id**: Update repayment details.
- **DELETE /repayments/:id**: Delete a repayment.

## 📌 Notes

- Ensure MongoDB is running and accessible via the connection string provided in the `.env` file.
- The application uses Nodemailer for sending email reminders. Configure `EMAIL_USER` and `EMAIL_PASS` in the `.env` file with valid credentials.
- Scheduled tasks for sending reminders are set up using Node.js cron jobs.

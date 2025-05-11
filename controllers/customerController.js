const Customer = require('../models/Customer');
const mongoose = require('mongoose');

const getCustomers = async (req, res)=>{
    try {
        console.log("Fetching all customers...");

        const customers = await Customer.find({ user: req.userId }).lean(); 
        
        // If no customers are found, send a 404 error response
        if(customers.length === 0 ){
            console.warn("No Customers Found.");
            return res.status(404).json({ message: "Customers not found." })
        }
        
        console.log(`Customers Retrieved: ${customers.length}`);
        res.status(200).json(customers);
    } catch (error) {
        console.error("Error Fetching Customers:", error.message);
        res.status(500).json({ error: "Internal Server Error while fetching customers." });
    }
}

// Add a New Customer
const addCustomer = async (req, res) => {
    try {
        const { name, phone } = req.body;
        console.log(`Adding Customer: ${phone}`);

        if (!req.userId) {
            console.error("Error: User ID is missing in request.");
            return res.status(400).json({ error: "User authentication required." });
        }

        // Validate phone number format
        if (!phone || phone.length !== 10) {
            console.error("Error: Invalid phone number format");
            return res.status(400).json({ error: "Invalid phone number format (must be 10 digits)." });
        }

        // Check if the customer already exists
        const customerExists = await Customer.findOne({ phone });
        if (customerExists) {
            console.error("Error: Customer already exists!");
            return res.status(409).json({ error: "Customer already exists." });  
        }
        
        //Save new customer
        const customer = new Customer({ ...req.body, user: req.userId });
        await customer.save();
        console.log(`Customer Added Successfully: ${name} (${phone})`);

        res.status(201).json({ message: "Customer added successfully", customer });       
    } catch (error) { 
        console.error("Error Adding Customer:", error.message);
        res.status(500).json({ error: "Internal Server Error while adding customer." });
    }
};

// Edit Customer
const editCustomer = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Editing Customer ID: ${id}`);

        // Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Error: Invalid customer ID format.");
            return res.status(400).json({ error: "Invalid customer ID format." });
        }

        // Check if customer exists
        const customerExit = await Customer.findOne({_id: id});
        if (!customerExit) {
            console.error("Error: Customer not found.");
            return res.status(404).json({ error: "Customer not found." });
        } 

        // Update Customer Data
        const updatedCustomer = await Customer.findByIdAndUpdate(id, req.body, {new : true});
        console.log(`Customer Updated: ${id}`);

        res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
        console.error("Error Editing Customer:", error.message);
        res.status(500).json({ error: "Internal Server Error while editing customer." });
    }
}

// Delete Customer
const deleteCustomer = async (req, res) => {
    try {
         const id = req.params.id;
         console.log(`Deleting Customer ID: ${id}`);

        // Validate MongoDB ID format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            console.error("Error: Invalid customer ID format.");
            return res.status(400).json({ error: "Invalid customer ID format." });
        }
         
        // Check if customer exists
         const customerExit = await Customer.findOne({_id: id});
         if (!customerExit) {
            console.error("Error: Customer not found.");
            return res.status(404).json({ error: "Customer not found." });
         }   

        // Delete customer
        await Customer.findByIdAndDelete(id);
        console.log(`Customer Deleted: ${id}`);

        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        console.error("Error Deleting Customer:", error.message);
        res.status(500).json({ error: "Internal Server Error while deleting customer." });
    }
};

module.exports = { getCustomers, addCustomer, editCustomer, deleteCustomer }


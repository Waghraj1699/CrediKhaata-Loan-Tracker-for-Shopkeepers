const User = require('../models/User');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
const register = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Registration attempt for: ${email}`);

        // Validate email format
        if (!validator.isEmail(email)) {
            console.error("Registration Error: Invalid email format");
            return res.status(400).json({ error: "Invalid email format" });
        }

        // Validate password strength (at least 8 characters)
        if (password.length < 8) {
            console.error("Registration Error: Weak password (must be at least 8 characters)");
            return res.status(400).json({ error: "Password must be at least 8 characters long" });
        }
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.error("Registration Error: User already exists");
            return res.status(400).json({ error: "User already exists" });
        }

        // Save new user to the database
        const user = new User({ email, password });
        await user.save();
        console.log(`User Registered Successfully: ${email}`);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Registration Failed:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// User Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(`Login attempt for: ${email}`);
        
        // Find user in DB
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            console.error("Login Error: Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT Token with expiration
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '9h' });
        console.log(`Login Successful: Token generated for ${email}`);
        res.json({ token });
    } catch (error) {
        console.error("Login Failed:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { register, login };

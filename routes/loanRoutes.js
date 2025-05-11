// routes/loanRoutes.js
const express = require('express');
const { createLoan, getLoans } = require('../controllers/loanController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/credit', authMiddleware, createLoan);
router.get('/fetch', authMiddleware, getLoans);


module.exports = router;

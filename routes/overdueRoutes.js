const express = require('express');
const { getOverdueLoans } = require('../controllers/overdueController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/loans', authMiddleware, getOverdueLoans);

module.exports = router;

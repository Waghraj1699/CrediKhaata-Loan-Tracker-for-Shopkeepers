const express = require('express');
const { handleRepaymentWebhook } = require('../controllers/webhookController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/repayment', authMiddleware, handleRepaymentWebhook);

module.exports = router;

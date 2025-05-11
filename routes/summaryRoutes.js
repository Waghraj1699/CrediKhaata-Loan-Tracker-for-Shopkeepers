const express = require('express');
const { getLoanSummary } = require('../controllers/summaryController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getLoanSummary);

module.exports = router;

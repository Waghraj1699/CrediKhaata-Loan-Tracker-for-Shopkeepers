const express = require('express');
const { getCustomers, addCustomer, editCustomer, deleteCustomer} = require('../controllers/customerController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/get',authMiddleware, getCustomers); 
router.post('/create',authMiddleware, addCustomer);
router.put('/update/:id',authMiddleware, editCustomer);
router.delete('/delete/:id',authMiddleware, deleteCustomer);

module.exports = router;

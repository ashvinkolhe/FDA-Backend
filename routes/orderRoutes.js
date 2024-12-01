const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { authMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware); // Protect order routes with auth

router.post('/create', createOrder);

module.exports = router;

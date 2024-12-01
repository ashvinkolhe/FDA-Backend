const express = require('express');
const router = express.Router();
const { addToCart, removeFromCart } = require('../controllers/cartController');

// Route to add an item to the cart
router.post('/add-to-cart', addToCart);

// Route to remove an item from the cart
router.delete('/remove-from-cart/:userId/:itemId', removeFromCart);

module.exports = router;

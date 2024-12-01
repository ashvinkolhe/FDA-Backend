const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Create order
const createOrder = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.userId }).populate('products.productId');
  const totalAmount = cart.products.reduce((acc, item) => acc + item.productId.price * item.quantity, 0);

  const order = new Order({
    userId: req.userId,
    products: cart.products.map((item) => ({
      productId: item.productId._id,
      quantity: item.quantity,
      price: item.productId.price,
    })),
    totalAmount,
  });

  await order.save();
  res.status(201).json(order);
};

module.exports = { createOrder };

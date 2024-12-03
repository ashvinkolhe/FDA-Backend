const Cart = require("../models/Cart");
const mongoose = require("mongoose");

// Add product to cart
const addToCart = async (req, res) => {
  const { userId, productId, title, price } = req.body;

  // Validate incoming data
  if (!userId || !productId || !title || !price) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // If the cart doesn't exist, create a new one
      cart = new Cart({ userId, items: [] });
    }

    // Check if the item already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity
    } else {
      // Add the new item to the cart
      cart.items.push({ productId, title, price, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params;

  // Validate incoming data
  if (!userId || !itemId) {
    return res.status(400).json({ success: false, message: "Missing userId or itemId" });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Ensure itemId is cast to ObjectId for comparison
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === itemId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ success: false, message: "Item not found in cart" });
    }

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    await cart.save();
    res.status(200).json({ success: true, message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error in removeFromCart:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Get cart for a user
const getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found", cart: [] });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { addToCart, removeFromCart, getCart };

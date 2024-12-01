const Cart = require("../models/Cart");

// Add product to cart
const addToCart = async (req, res) => {
  const { userId, productId, title, price } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    const existingItem = cart.items.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, title, price, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ success: true, message: "Item added to cart", cart });
  } catch (error) {
    console.error("Error in addToCart:", error); // Log the error
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};


// Remove product from cart
const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params; // Use params to get userId and itemId from the URL

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    // Remove the product from the cart
    cart.items = cart.items.filter((item) => item.productId.toString() !== itemId);
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

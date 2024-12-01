const productsData = require('../data/products.json'); // Static product data

// Get all products
const getProducts = (req, res) => {
  res.status(200).json(productsData);
};

module.exports = { getProducts };

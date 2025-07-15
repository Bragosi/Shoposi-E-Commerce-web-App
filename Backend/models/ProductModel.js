const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema(
  {
    productName: String,
    brandName: String,
    category: String,
    productImage: [String],
    description: String,
    price: Number,
    selling: Number,
  },
  { timestamps: true }
);

const productModel = mongoose.model('product', ProductSchema);

module.exports = productModel;

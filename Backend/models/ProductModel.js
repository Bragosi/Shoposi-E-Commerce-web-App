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

// Added a text index for full-text search
ProductSchema.index({
  productName: "text",
  brandName: "text",
  category: "text",
  description: "text"
});

const productModel = mongoose.model('product', ProductSchema);

module.exports = productModel;

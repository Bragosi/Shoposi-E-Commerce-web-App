const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "user",
    },
    name: String,
    phoneNumber: String,
    city: String,
    totalAmount : String,
    status: {
      type: String,
      default: "PENDING"
    },
    orderedItems: [
      {
        productId: {
          type: String,
          ref: "product",
        },
        productName: String,
        productImage: [String],
        price: Number,
        selling: Number,
        quantity: Number,
      }
    ]
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;

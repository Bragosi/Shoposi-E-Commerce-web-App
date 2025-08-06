const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      ref: "product",
      type: String,
    },
    userId: {
      type: String,
      ref: "user",
    },
    name: String,
    phoneNumber: String,
    city: String,
    status : String
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("Order", orderItemSchema);

module.exports = OrderModel;

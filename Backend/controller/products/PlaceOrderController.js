const AddToCartModel = require("../../models/CartProducts");
const OrderModel = require("../../models/OrderModel");

const placeOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phoneNumber, city } = req.body;

    const cartItems = await AddToCartModel.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const orders = [];

    for (const item of cartItems) {
      const newOrder = new OrderModel({
        productId: item.productId,
        userId,
        name,
        phoneNumber,
        city,
        status: "PENDING",
      });

      const placedOrder = await newOrder.save();
      orders.push(placedOrder);
    }

    await AddToCartModel.deleteMany({ userId });

    res.status(201).json({
      data: orders,
      message: "Order(s) placed successfully!",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = placeOrderController;

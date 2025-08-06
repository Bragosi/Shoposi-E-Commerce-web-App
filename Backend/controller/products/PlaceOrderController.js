const AddToCartModel = require("../../models/CartProducts");
const OrderModel = require("../../models/OrderModel");

const placeOrderController = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phoneNumber, city, totalAmount } = req.body;

    const cartItems = await AddToCartModel.find({ userId });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const orderData = {
      userId,
      name,
      phoneNumber,
      city,
      totalAmount,
      status: "PENDING",
      orderedItems: cartItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        selling: item.selling,
        quantity: item.quantity || 1,
      })),
    };

    const newOrder = await OrderModel.create(orderData);

    await AddToCartModel.deleteMany({ userId });

    res.status(201).json({
      data: newOrder,
      message: "Order placed successfully!",
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

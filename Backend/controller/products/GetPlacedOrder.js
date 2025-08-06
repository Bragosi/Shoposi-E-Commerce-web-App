const OrderModel = require("../../models/OrderModel");

const getPlacedOrder = async (req, res) => {
  try {
    const allOrders = await OrderModel.find().sort({ createdAt: -1 });

    res.json({
      data: allOrders,
      success: true,
      error: false,
      message: "All orders",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something went wrong",
      error: true,
      success: false,
    });
  }
};

module.exports = getPlacedOrder;

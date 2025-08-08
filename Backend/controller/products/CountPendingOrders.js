const OrderModel = require("../../models/OrderModel");

const countPendingOrders = async (req, res) => {
  try {
    const count = await OrderModel.countDocuments({ status: "pending" });

    res.json({
      count,
      message: "Pending orders counted successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      error: true,
      success: false,
    });
  }
};

module.exports = countPendingOrders;

const OrderModel = require("../../models/OrderModel");

const updateOrderStatus = async (req, res) => {
  try {
    const { _id, status } = req.body;

    if (!_id || !status) {
      return res.status(400).json({
        message: "Order ID and status are required",
        success: false,
        error: true,
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      _id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
        error: true,
      });
    }

    res.json({
      data: updatedOrder,
      message: "Order status updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
};

module.exports = updateOrderStatus;

const OrderModel = require("../../models/OrderModel");

const DeleteOrder = async (req, res) => {
  try {
    const orderId = req.body._id;

    if (!orderId) {
      return res.status(400).json({
        message: "Order ID is required",
        success: false,
        error: true,
      });
    }

    const deletedOrder = await OrderModel.deleteOne({ _id: orderId });

    res.json({
      message: "Order deleted successfully",
      error: false,
      success: true,
      data: deletedOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = DeleteOrder;

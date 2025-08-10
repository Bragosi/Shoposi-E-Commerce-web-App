const OrderModel = require("../../models/OrderModel");

const GetDeliveredOrder = async (req, res) => {
  try {
    const deliverdOrder = await OrderModel.find({ status: "DELIVERED" });

    res.json({
      data: deliverdOrder,
      message: "Delivered Order Fetched",
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

module.exports = GetDeliveredOrder;

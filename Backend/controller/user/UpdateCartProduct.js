const AddToCartModel = require("../../models/CartProducts");

const UpdateCartProduct = async (req, res) => {
  try {
    const cartProductId = req.body._id;
    const qty = req.body.quantity;

    if (!cartProductId) {
      throw new Error("Cart product ID is required");
    }

    const updateProduct = await AddToCartModel.updateOne(
      { _id: cartProductId },
      { ...(qty && { quantity: qty }) }
    );

    res.json({
      data: updateProduct,
      message: "Product updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = UpdateCartProduct;

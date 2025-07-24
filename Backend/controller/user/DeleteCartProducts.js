const AddToCartModel = require("../../models/CartProducts");

const DeleteCartProduct = async (req, res) => {
  try {
    const CartProductId = req.body._id;

    // Ensure the user owns the product they're deleting (optional security)
    const deleteProduct = await AddToCartModel.deleteOne({
      _id: CartProductId,
    });

    res.json({
      message: "Product removed from cart",
      error: false,
      success: true,
      data: deleteProduct
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

module.exports = DeleteCartProduct
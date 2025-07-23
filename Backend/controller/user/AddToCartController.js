const AddToCartModel = require("../../models/CartProducts");

const AddToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.userId;

    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
        success: false,
        error: true,
      });
    }

    // Check if product already exists in this user's cart
    const existingProduct = await AddToCartModel.findOne({ productId, userId: currentUser });

    if (existingProduct) {
      return res.json({
        message: "Product already in cart",
        success: false,
        error: true,
        data: existingProduct,
      });
    }

    // Create new cart item
    const newCartItem = new AddToCartModel({
      productId,
      quantity: 1,
      userId: currentUser,
    });

    const savedItem = await newCartItem.save();

    return res.status(201).json({
      message: "Product added to cart",
      success: true,
      error: false,
      data: savedItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Server error",
      success: false,
      error: true,
    });
  }
};

module.exports = AddToCartController;

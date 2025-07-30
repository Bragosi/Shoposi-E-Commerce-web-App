const productModel = require("../../models/ProductModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req.body.category || [];

    const products = await productModel.find({
      category: { $in: categoryList }
    });

    res.json({
      data: products,
      message: 'Filtered products fetched successfully',
      error: false,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;

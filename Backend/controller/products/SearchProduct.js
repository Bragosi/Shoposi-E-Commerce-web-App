const productModel = require("../../models/ProductModel"); 

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q?.trim();

    if (!query) {
      return res.status(400).json({
        message: "Search query is missing",
        success: false,
        error: true,
      });
    }

    const regex = new RegExp(query, 'i'); // 'i' for case-insensitive

    const product = await productModel.find({
      $or: [
        { productName: regex },
        { category: regex },
      ],
    });

    res.json({
      message: "Search product list",
      success: true,
      error: false,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;

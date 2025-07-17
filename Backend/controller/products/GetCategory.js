const productModel = require("../../models/ProductModel");

const GetProductCategory = async (req, res) => {
  try {
    // Get unique categories
    const productCategories = await productModel.distinct("category");

    // Array to store products grouped by category
    const productsByCategory = [];

    for (const category of productCategories) {
      const products = await productModel.find({ category });

      if (products.length > 0) {
        productsByCategory.push({
          category,
          products,
        });
      }
    }

    res.json({
      message: "Product Categories with Products",
      data: productsByCategory,
      success: true,
      error: false,
    });

    console.log("Categories found:", productCategories);
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = GetProductCategory;

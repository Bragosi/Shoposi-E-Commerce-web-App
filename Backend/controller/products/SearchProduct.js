const productModel = require("../../models/ProductModel");

const searchProduct = async (req, res) => {
  try {
    const query = req.query.q?.trim();

    // Validate query
    if (!query || query.length < 2) {
      return res.status(400).json({
        message: "Search query must be at least 2 characters long",
        success: false,
        error: true,
      });
    }
    if (query.length > 50) {
      return res.status(400).json({
        message: "Search query is too long (max 50 characters)",
        success: false,
        error: true,
      });
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query filter (try text first)
    let queryFilter = { $text: { $search: query } };
    let projection = { score: { $meta: "textScore" } };
    let sort = { score: { $meta: "textScore" } };

    // Test text search first
    const testTextSearch = await productModel.find(queryFilter).limit(1);
    if (!testTextSearch.length) {
      // Fallback to regex if no text results
      const regex = new RegExp(query, "i");
      queryFilter = {
        $or: [
          { productName: regex },
          { brandName: regex },
          { category: regex },
          { description: regex },
        ],
      };
      projection = {};
      sort = {}; // no text score for regex
    }

    // Fetch results + count in parallel
    const [products, total] = await Promise.all([
      productModel.find(queryFilter, projection).sort(sort).skip(skip).limit(limit).lean(),
      productModel.countDocuments(queryFilter),
    ]);

    res.json({
      message: products.length ? "Search results retrieved" : "No products found",
      success: true,
      error: false,
      data: {
        products,
        pagination: {
          page,
          limit,
          total, // total matching products (not just current page)
        },
      },
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      message: "An error occurred while searching",
      error: true,
      success: false,
    });
  }
};

module.exports = searchProduct;

const productModel = require("../../models/ProductModel");


const GetCategoryProduct = async (req, res) => {
  try {
   const { category } = req?.body || req.query
   const product = await productModel.find({ category })

   res.json({
    data : product,
    message :"Products",
    success : true ,
    error : false
   })
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};


module.exports = GetCategoryProduct;

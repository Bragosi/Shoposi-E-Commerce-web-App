const productModel = require('../../models/ProductModel')
const UploadProdctPermission = require("../../helpers/Permission");

async function updateProductController(req, res) {
  try {
    const hasPermission = await UploadProdctPermission(req.userId);
    if (!hasPermission) {
      throw new Error("Permission Denied");
    }

    const { _id, ...resBody } = req.body;

    if (!_id) {
      return res.status(400).json({
        message: "Product ID is required",
        error: true,
        success: false,
      });
    }

    const updateProduct = await productModel.findByIdAndUpdate(_id, resBody, {
      new: true,          // return updated document
      runValidators: true // optional: ensures data validity
    });

    if (!updateProduct) {
      return res.status(404).json({
        message: "Product not found",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product Updated Successfully",
      data: updateProduct,
      success: true,
      error: false
    });

  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
module.exports = updateProductController;

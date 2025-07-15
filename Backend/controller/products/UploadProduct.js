const UploadProdctPermission = require("../../helpers/Permission");
const productModel = require("../../models/ProductModel");

async function UploadProductController(req, res) {
  try {
    const sessionUserId = req.userId;

    const hasPermission = await UploadProdctPermission(sessionUserId);
    if (!hasPermission) {
      throw new Error("Permission Denied");
    }

    const newProduct = new productModel(req.body);
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product Upload Successful",
      error: false,
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

module.exports = UploadProductController;

const productModel = require("../../models/ProductModel");

const filterProductController = async(req, res)=>{
    try {
        const categoryList = req?.body?.category
        
        const product = await productModel.find({
            category : {

            }       })
    } catch (error) {
            res.status(400).json({
              message: error.message || error,
              error: true,
              success: false,
            });
          }
}
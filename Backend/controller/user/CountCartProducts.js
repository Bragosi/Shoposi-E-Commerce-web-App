const AddToCartModel = require("../../models/CartProducts")

const CountCartProducts = async(req, res)=>{
    try {
        const userId = req.userId

        const Count = await AddToCartModel.countDocuments({
            userId : userId,
        })
        res.json({
            data : {Count : Count},
            message : "ok",
            error : false,
            success : true
        })

    }catch(error){
        res.status(400).json({
            message : error.message || error,
            error: true,
            success : false
        })
    }
}
module.exports = CountCartProducts
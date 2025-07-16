const userModel = require("../../models/User")
async function allUsers(req, res){
    try {
        console.log('userId', req.userId)
        
        const allUser = await userModel.find()

        res.json({
            message : "All User",
            data : allUser,
            success : true,
            error: false
        })
    }catch(error){
        res.status(400).json({
            message : error.message || error,
            error: true,
            success : false
        })}
}
module.exports = allUsers
const express = require('express');
const router  = express.Router();

const userSignUp = require("../controller/user/UserSignUp");
const UserSignIn = require("../controller/user/UserSignIn");
const userDetails = require('../controller/user/UserDetails');
const authToken = require('../middleWare/authToken');
const userLogOut = require('../controller/user/UserLogOut');
const allUsers = require('../controller/user/allUsers');
const updateUserController = require('../controller/user/updateUser');
const UploadProductController = require('../controller/products/UploadProduct');
const GetProductController = require('../controller/products/GetProduct');
const updateProductController = require('../controller/products/UpdateProduct');


router.post('/signUp', userSignUp)
router.post('/login', UserSignIn )
router.get('/userDetails', authToken, userDetails);
router.get('/userLogOut', userLogOut)


//admin Panel
router.get("/allUser", authToken, allUsers)
router.post("/updateUser", authToken, updateUserController)

//products
router.post("/uploadProduct", authToken, UploadProductController)
router.get("/getProduct", GetProductController )
router.post("/updateProduct", authToken, updateProductController)

module.exports = router;      
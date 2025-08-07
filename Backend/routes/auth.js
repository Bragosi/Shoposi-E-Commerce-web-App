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
const GetProductCategory = require('../controller/products/GetCategory');
const GetCategoryProduct = require('../controller/products/GetCategoryProduct');
const getProductDetails = require('../controller/products/GetProductDetails');
const AddToCartController = require('../controller/user/AddToCartController');
const CountCartProducts = require('../controller/user/CountCartProducts');
const ViewCartProducts = require('../controller/user/ViewCartProducts');
const UpdateCartProduct = require('../controller/user/UpdateCartProduct');
const DeleteCartProduct = require('../controller/user/DeleteCartProducts');
const searchProduct = require('../controller/products/SearchProduct');
const placeOrderController = require('../controller/products/PlaceOrderController');
const getPlacedOrder = require('../controller/products/GetPlacedOrder');
const updateOrderStatus = require('../controller/products/UpdateOrderStatus');
const DeleteOrder = require('../controller/products/DeleteOrder');

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
router.get("/getProductCategory", GetProductCategory )
router.post("/getCategoryProduct", GetCategoryProduct)
router.post("/productDetails", getProductDetails)
router.get("/search", searchProduct)


// Add to cart
router.post("/addToCart", authToken, AddToCartController)
router.get("/countCartProduct", authToken, CountCartProducts)
router.get("/viewCartProducts", authToken, ViewCartProducts)
router.post("/updateCartProduct", authToken, UpdateCartProduct)
router.post("/deleteCartProduct", authToken, DeleteCartProduct)


//order 
router.post("/placeOrder", authToken, placeOrderController)
router.get("/allOrders", authToken, getPlacedOrder)
router.post("/orderStatus", authToken, updateOrderStatus)
router.post("/deleteOrder", authToken, DeleteOrder)
module.exports = router;      
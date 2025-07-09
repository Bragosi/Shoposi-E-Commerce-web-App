const express = require('express');
const router  = express.Router();

const userSignUp = require("../controller/user/UserSignUp");
const UserSignIn = require("../controller/user/UserSignIn");
const userDetails = require('../controller/user/UserDetails');
const authToken = require('../middleWare/authToken');
const userLogOut = require('../controller/user/UserLogOut');


router.post('/signUp', userSignUp)
router.post('/login', UserSignIn )
router.get('/userDetails', authToken, userDetails);
router.get('/userLogOut, userLogOut')

module.exports = router;      
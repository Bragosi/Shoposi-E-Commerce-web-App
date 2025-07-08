const express = require('express');
const router  = express.Router();

const userSignUp = require("../controller/user/UserSignUp");
const UserSignIn = require("../controller/user/UserSignin");
const userDetails = require('../controller/user/UserDetails');
const authToken = require('../middleWare/authToken');


router.post('/signUp', userSignUp)
router.post('/login', UserSignIn )
router.get('/userDetails', authToken, userDetails);

module.exports = router;      
const express = require('express');
const router  = express.Router();

const userSignUp = require("../controller/user/UserSignUp");
const UserSignIn = require("../controller/user/UserSignin");


router.post('/signUp', userSignUp)
router.post('/login', UserSignIn )


module.exports = router;      
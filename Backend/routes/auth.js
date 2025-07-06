const express = require('express');
const router  = express.Router();

const userSignUp = require("../controller/user/UserSignUp");
const userSignin = require('../controller/user/UserSignin');

router.post('/signUp', userSignUp)
router.post('/login', userSignin)
module.exports = router;      

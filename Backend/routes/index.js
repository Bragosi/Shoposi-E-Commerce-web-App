const express = require('express')

const router = express.Router()

const userSignUpController=require('../controller/UserSignUp.js')
router.post("/signUp", userSignUpController)
module.exports = router
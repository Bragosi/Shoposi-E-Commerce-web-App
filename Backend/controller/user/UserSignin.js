const bcrypt = require("bcryptjs");
const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // 1  Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        error: true,
      });
    }

    // 2  Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    // 3  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // Wrong password
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        error: true,
      });
    }

    // Correct password → issue JWT & cookie
    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: 60 * 60 * 8, // 8 h
    });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // avoid localhost issues
        sameSite: "strict",
        maxAge: 60 * 60 * 8 * 1000, // 8 h
      })
      .status(200)
      .json({
        message: "Login successful",
        data: token,
        success: true,
        error: false,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

module.exports = userSignIn;
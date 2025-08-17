const bcrypt = require("bcryptjs");
const userModel = require("../../models/User");
const jwt = require("jsonwebtoken");

async function UserSignIn(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
        error: true,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        error: true,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
        success: false,
        error: true,
      });
    }

    const tokenData = { _id: user._id, email: user.email };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, {
      expiresIn: "7d", // 7 days
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      partitioned: true,
    });


    return res.status(200).json({
      message: "Login successful",
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

module.exports = UserSignIn;

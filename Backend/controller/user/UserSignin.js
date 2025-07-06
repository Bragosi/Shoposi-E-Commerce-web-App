const bcrypt     = require('bcryptjs');
const userModel  = require('../../models/User');

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    // 1  Basic validation
    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
        success: false,
        error: true,
      });
    }

    // 2  Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        success: false,
        error: true,
      });
    }

    // 3  Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Incorrect password',
        success: false,
        error: true,
      });
    }

    // 4  Success → issue JWT or just confirm login
    return res.status(200).json({
      message: 'Login successful',
      user:   { id: user._id, name: user.name, email: user.email },
      success: true,
      error:   false,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || 'Server error',
      success: false,
      error:   true,
    });
  }
}

module.exports = userSignIn;

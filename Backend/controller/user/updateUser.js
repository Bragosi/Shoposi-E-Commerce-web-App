const userModel = require('../../models/User');

async function updateUserController(req, res) {
  try {
    const sessionUser = req.userId;
    const { userId, email, name, role } = req.body;

    const payload = {
      ...(email && { email }),
      ...(name && { name }),
      ...(role && { role }),
    };

    const user = await userModel.findById(sessionUser);
    console.log("user role", user.role);

    const updateUser = await userModel.findByIdAndUpdate(userId, payload, { new: true });

    res.json({
      data: updateUser,
      message: "User Updated",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error: true,
    });
  }
}

module.exports = updateUserController;

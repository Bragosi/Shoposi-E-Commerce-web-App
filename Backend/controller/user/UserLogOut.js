async function userLogOut(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    return res.json({
      message: "Logout Successful",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    console.error("LogOut Error:", err.message);
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

module.exports = userLogOut;
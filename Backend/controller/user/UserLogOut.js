async function userLogOut(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true, // must match login
      sameSite: "None", // only needed if frontend and backend are on different domains
      path: "/", // must match login
    });

    return res.json({
      message: "Logout Successful",
      error: false,
      success: true,
      data: [],
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

module.exports = userLogOut;

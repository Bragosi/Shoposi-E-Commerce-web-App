async function userLogOut(req, res) {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,      
      sameSite: "None",   
      path: "/",          
      partitioned: true, 
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

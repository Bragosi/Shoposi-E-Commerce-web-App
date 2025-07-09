async function userLogOut(req, res) {
    try {
        res.clearCookies("token")

        res.json({
            message : "Logout Succesful",
            error : false,
            success : true,
            data : []
        })
    }catch (err) {
    console.error(err);
    return res.status(500).json({
      message: err.message || "Server error",
      success: false,
      error: true,
    });
  }
}

module.exports = userLogOut
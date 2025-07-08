const jwt = require('jsonwebtoken');

async function authToken(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({
                message: "User not Logged In",
                error: true,
                success: false,
            });
        }

        jwt.verify(token, process.env.TOKEN_SECRET_KEY, (error, decoded) => {
            if (error) {
                console.log("JWT Error:", error);
                return res.status(401).json({
                    message: "Invalid or expired token",
                    error: true,
                    success: false,
                });
            }

            req.userId = decoded._id;
            console.log("Decoded Token:", decoded);
            next();
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;

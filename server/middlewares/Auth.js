const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];

    if (!token) {
      return res.status(400).json({
        message: "Missing Auth token",
      });
    }

    if (jwt.verify(token, "expensetracker")) {
      next();
    } else {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Unauthorized",
      error: err.message,
    });
  }
};

module.exports = Auth;

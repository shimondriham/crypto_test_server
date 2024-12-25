const jwt = require("jsonwebtoken");

//User authentication
exports.auth = (req, res, next) => {
    let token = req.header("x-api-key");
    if (!token) {
      return res.status(401).json({ err: "You must send token in header to this endpoint" })
    }
    try {
      let decodeToken = jwt.verify(token, "test22");
      req.tokenData = decodeToken;
      next();
    }
    catch (err) {
      return res.status(401).json({ err: "Token invalid or expired" });
    }
  }
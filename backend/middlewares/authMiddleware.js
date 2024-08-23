const jwt = require("jsonwebtoken");
const { secret } = require("../utils/jwtUtils");

exports.authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json("Unauthorized");

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json("Invalid token");
    req.user = user;
    next();
  });
};

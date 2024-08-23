const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const salt = bcrypt.genSaltSync(10);
const secret = "asdfe45we45w345wegw345werjktjwertkj";

const verifyToken = (token, callback) => {
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    callback(info);
  });
};

module.exports = { salt, secret, verifyToken };

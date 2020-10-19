require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    if (decoded.role === "admin") {
      next();
    } else {
      res.status(400).json({ message: "not authorized" });
    }
  } else {
    res.status(400).json({ message: "You must login" });
  }
};

module.exports = { checkAdmin };

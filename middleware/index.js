require("dotenv").config();
const jwt = require("jsonwebtoken");

const checkAdmin = (req, res, next) => {
  if (req.headers.authorization) {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
    if (decoded.role === "admin") {
      next();
    } else if (decoded.role === "volunteer") {
      next();
    } else {
      res.status(401).json({ message: "not authorized" });
    }
  } else {
    res.status(401).json({ message: "You must login" });
  }
};



module.exports = { checkAdmin };

const router = require("express").Router()
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");

const { findTasks } = require("../models/utils");

router.get("/volunteer", async (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
  const id = decoded.sub;
  
  try {
    const result = await findTasks(id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
});

module.exports = router
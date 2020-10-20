const router = require("express").Router()
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");

const { findBy } = require("../models/utils");

router.get("/volunteer", async (req, res) => {
  const decoded = jwt.verify(req.headers.authorization, process.env.SECRET);
  const id = decoded.sub;

  try {
    const user = await findBy({ id });
    // TODO find tasks for specific vol
  } catch (error) {
    console.log(error);
  }
});

module.exports = router
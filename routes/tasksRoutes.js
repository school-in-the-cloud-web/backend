const router = require("express").Router();
var jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");

router.get("/", async (req, res) => {
  try {
    const tasks = await db("tasks").select(
      "id",
      "name",
      "volunteer_id",
      "subject",
      "description",
      "date"
    );
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "there was an error with your request" });
  }
});

module.exports = router;

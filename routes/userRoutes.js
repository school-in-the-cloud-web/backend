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

router.get("/getVolunteers", async (req, res) => {
  try {
    const volunteers = await db("users")
      .where({ role: "volunteer" })
      .select("id", "firstName", "lastName", "email");
    res.status(200).json(volunteers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not process your request" });
  }
});

router.get("/student", async (req, res) => {
  try {
    const data = await db("users")
      .join("tasks", "users.id", "=", "tasks.volunteer_id")
      .select(
        "users.firstName as instructor_firstName",
        "users.lastName as instructor_lastName",
        "users.email as instructor_email",
        "tasks.name as class_name",
        "tasks.subject as class_subject",
        "tasks.description as class_description",
        "tasks.date as class_date",
        "users.country as class_location"
      );
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
});
module.exports = router

//.where({ role: "volunteer" })
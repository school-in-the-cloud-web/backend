const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");
const { findTask } = require("../models/utils");
const Joi = require("joi");
const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: "",
    },
  },
};


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

router.post("/", async (req, res) => {
  const { name, volunteer, subject, description, date } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(60).required(),
    volunteer: Joi.number().required(),
    subject: Joi.string().min(3).max(60).required(),
    description: Joi.string().min(3).max(256),
    date: Joi.string().min(10).max(10).required(),
  });
  const validation = schema.validate(
    {
      name,
      volunteer,
      subject,
      description,
      date,
    },
    options
  );

  if (validation.error) {
    const errors = validation.error.details;
    const error = errors.map((error) => {
      return error.message;
    });
    res.status(400).json({ error: error });
  } else {
    try {
      await db("tasks").insert({
        name: name,
        volunteer_id: volunteer,
        subject: subject,
        description: description,
        date: date,
      });
      res.status(201).end();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "could not add task" });
    }
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const task = await db("tasks").where({ id });
    if (task.length === 1) {
      try {
        const taskToDelete = task[0].id;
        await db("tasks").where({ id: taskToDelete }).delete();
        res.status(200).json({ message: "task deleted" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "could not process your request" });
      }
    } else {
      res.status(400).json({ message: "task not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "could not process your request" });
  }
});
module.exports = router;

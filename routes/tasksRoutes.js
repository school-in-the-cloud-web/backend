const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("../data/dbConfig");

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

module.exports = router;

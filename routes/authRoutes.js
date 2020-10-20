const router = require("express").Router()

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { findBy, addUser } = require("../models/utils");

const Joi = require('joi');
const options = {
  abortEarly: false,
  errors: {
    wrap: {
      label: ''
    }
  }
};

router.post('/register', async (req, res) => {
  const {
    firstName,
    lastName,
    password,
    confirmPassword,
    email,
    role,
  } = req.body;

  const schema = Joi.object({
    firstName: Joi.string().alphanum().min(3).max(30).required(),
    lastName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required(),
    confirmPassword: Joi.ref("password"),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
  });
  const validation = schema.validate(
    {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      role,
    },
    options
  );

  if(validation.error) {
    const errors = validation.error.details;
    const error = errors.map((error) => {
      return error.message;
    });
    res.status(400).json({ error: error });
  } else {
    try {
      const userExists = await findBy({ email });
      if (userExists.length > 0) {
        res.status(400).json({ message: "Email in use" });
      } else {
        await addUser(firstName, lastName, email, password, role);
        res.status(201).json({ message: "User Added" });
      }
    } catch (error) {
      res.status(500).json({ message: "There was an error with your request" });
    }
  }
  
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await findBy({ email });
    if (result.length > 0) {
      const user = result[0];
      const authed = bcrypt.compareSync(password, user.password);
  
      if(authed) {
        const token = jwt.sign(
          {
            sub: user.id,
            email: user.email,
            role: user.role,
          },
          process.env.SECRET,
          { expiresIn: "2h" }
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({message: "Incorrect password"})
      }
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    res.status(400).json({ message: "All fields are required" });
  }
  
})


module.exports = router
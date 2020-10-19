require('dotenv').config()
const express = require("express");
const app = express()
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/tasksRoutes");

const { checkAdmin } = require("./middleware");

app.use(helmet());
app.use(cors());
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/user", userRoutes)
app.use("/tasks", checkAdmin, taskRoutes);

app.get("/", (req, res) => {
  res.status(200).json({message: "Api is up and running"})
})

app.listen(process.env.PORT)
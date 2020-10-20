const db = require("../data/dbConfig");
const bcrypt = require("bcrypt");

const findBy = (filter) => {
  return db("users").where(filter).select("email", "password", "role", "id");
};

const addUser = (firstName, lastName, email, password, role, country) => {
  const hashedPw = bcrypt.hashSync(password, 8);
  return db("users").insert({
    firstName,
    lastName,
    email,
    password: hashedPw,
    role,
    country,
  });
};

const findTasks = (id) => {
  console.log(id);
  return db("tasks")
    .where({ volunteer_id: id })
    .select("id", "name", "subject", "description", "date");
};

// TODO find tasks for specific vol

module.exports = { findBy, addUser, findTasks };

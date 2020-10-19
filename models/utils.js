const db = require("../data/dbConfig");
const bcrypt = require("bcrypt");

const findBy = (filter) => {
  return db("users").where(filter).select("email", "password");
};

const addUser = (firstName, lastName, email, password) => {
  const hashedPw = bcrypt.hashSync(password, 8);
  return db("users").insert({ firstName, lastName, email, password: hashedPw });
};

module.exports = { findBy, addUser };

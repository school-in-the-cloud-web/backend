const bcrypt = require("bcrypt");
const hash = bcrypt.hashSync("gRh06ZYT1gSB", 8);

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          firstName: "Matt",
          lastName: "Mulford",
          password: hash,
          email: "matt@mulford.dev",
          role: "admin",
        },
        {
          id: 2,
          firstName: "Virginia",
          lastName: "Scirrotto",
          password: hash,
          email: "vscirrotto@email.com",
          role: "admin",
        },
        {
          id: 3,
          firstName: "Sam",
          lastName: "Tarullo",
          password: hash,
          email: "starullo@email.com",
          role: "admin",
        },
        {
          id: 4,
          firstName: "Jon",
          lastName: "Volunteer",
          password: hash,
          email: "jvolunteer@email.com",
          role: "volunteer",
        },
      ]);
    });
};

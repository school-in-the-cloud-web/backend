const { table } = require("../dbConfig");

exports.up = function (knex) {
  return knex.schema.createTable("tasks", (tbl) => {
    tbl.increments();
    tbl.string("name").notNullable();
    tbl.string("volunteer_id").references("users.id").notNullable();
    tbl.string("subject").notNullable();
    tbl.string("description");
    tbl.string("date").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("tasks");
};

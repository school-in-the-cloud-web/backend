exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("firstName").notNullable();
    tbl.string("lastName").notNullable();
    tbl.string("password").notNullable();
    tbl.string("email").notNullable();
    tbl.string("role").notNullable();
    tbl.string("country").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};

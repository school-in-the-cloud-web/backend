exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("firstName");
    tbl.string("lastName");
    tbl.string("password");
    tbl.string("email");
    tbl.string("role");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};

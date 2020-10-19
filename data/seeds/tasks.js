exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("tasks")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("tasks").insert([
        {
          id: 1,
          name: "Super Advanced Math",
          volunteer_id: 4,
          subject: "Math",
          description: "Math that will hurt your brain",
          date: "2020-11-29",
        },
        {
          id: 2,
          name: "Geography",
          volunteer_id: 4,
          subject: "Geography",
          description: "Learn where things are",
          date: "2020-12-08",
        },
        {
          id: 3,
          name: "Chemistry",
          volunteer_id: 4,
          subject: "Science",
          description: "Learn what things are made of",
          date: "2021-03-01",
        },
      ]);
    });
};

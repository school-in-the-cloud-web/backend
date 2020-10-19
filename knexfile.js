// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/cloud-school.sqlite3'
    },
    migrations: {
      directory: './data/migrations',
      tableName: 'dbmigrations',
    },
    seeds: { directory: './data/seeds' },
  },

  production: {
    client: 'sqlite3',
    connection: {
      filename: './data/cloud-school.sqlite3'
    }
  }

};

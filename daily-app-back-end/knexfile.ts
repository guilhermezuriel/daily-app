import type { Knex } from "knex";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/dev.db"
    },
    migrations:{
      extension:'ts',
      directory:'./database/migrations'
    }
  },

};

module.exports = config;

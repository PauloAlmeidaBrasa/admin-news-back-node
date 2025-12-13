// import knex from "knex";
// import dotenv from "dotenv";

// dotenv.config();

// const db = knex({
//   client: "mysql2",
//   connection: {
//     host: "db",
//     port: 3306,
//     user: "123",
//     password: "123",
//     database: "news_back_test_db",
//   },
//   pool: { min: 2, max: 10 },
//   migrations: {
//     tableName: "knex_migrations",
//     directory: "./db/migrations",
//     extension: "ts",
//   },
// });

// // console.log("🚀 Loadeeeed Knex config:", db);
// export default db;


import dotenv from "dotenv";
dotenv.config();

const knexConfig = {
  client: "mysql2",
  connection: {
    host: "db",
    port: 3306,
    user: "root",
    password: "root",
    database: "news_back_test_db",
  },
  pool: { min: 2, max: 10 },
  migrations: {
    tableName: "knex_migrations",
    directory: "./src/config/db/migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./src/config/db/seeds",
  },
};

export default knexConfig;

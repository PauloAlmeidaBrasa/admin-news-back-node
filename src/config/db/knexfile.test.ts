
// import dotenv from "dotenv";
// dotenv.config({path:'.env.test'});

const knexTestConfig = {
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "news_back_test_db",
    connectTimeout: 5000
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

export default knexTestConfig;

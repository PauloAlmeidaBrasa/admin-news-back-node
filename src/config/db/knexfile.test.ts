

const knexTestConfig = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
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

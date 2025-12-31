
import type { Knex } from "knex";
import { config } from "dotenv";

config()

console.log(
  process.env.DB_HOST,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD
)

const knexConfig: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT) || 3306,
    connectTimeout: 5000
  },
  pool: {
    min: 0,
    max: 3,
    acquireTimeoutMillis: 3000,
    createTimeoutMillis: 3000,
    idleTimeoutMillis: 3000,
  },
  migrations: {
    directory: "./migrations",
    extension: "ts",
  },
  seeds: {
    directory: "./seeds",
    extension: "ts",
  },
};

export default knexConfig;


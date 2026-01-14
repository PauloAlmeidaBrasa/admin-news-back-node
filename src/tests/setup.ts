import knex, { Knex } from "knex";
import request from "supertest";
import mysql from "mysql2/promise";
import { createApp } from "../app";
import { createTestUser, deleteTestUser } from "./helpers/testUser";

let db: Knex;
let app: ReturnType<typeof createApp>;
let testUserId: number;

beforeAll(async () => {
  if (process.env.NODE_ENV !== "test") {
    throw new Error("🚨 Tests are NOT allowed outside test environment!");
  }

  if (!process.env.DB_NAME?.includes("test")) {
    throw new Error("🚨 Test DB must include 'test' in its name!");
  }

  console.log("🚨 ",process.env.DB_HOST,process.env.DB_NAME)
  const adminConn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
  });

  await adminConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``
  );

  await adminConn.end();

  const knexTestConfig = (await import("../config/db/knexfile.test")).default;
  db = knex(knexTestConfig);
  app = createApp(db);

  await db.migrate.rollback(undefined, true);
  await db.migrate.latest();
  await db.seed.run();

  const user = await createTestUser(db);
  testUserId = user.id;

  const loginRes = await request(app)
    .post("/v1/authentication")
    .send({ email: user.email, password: user.password });

  (global as any).authToken = loginRes.body.access_token;
  (global as any).userId = testUserId;
});

afterAll(async () => {
  if (testUserId) {
    await deleteTestUser(db, testUserId);
  }

  if (db) {
    await db.destroy(); 
  }
});

export { db, app };
import knex from "knex"
import knexTestConfig from "../config/db/knexfile.test"
import request from "supertest"
import { createApp } from "../app"
import { createTestUser, deleteTestUser } from "./helpers/testUser";


export const db = knex(knexTestConfig);
export const app = createApp(db);

let testUserId: number;

beforeAll(async () => {

  console.log(process.env.NODE_ENV)
  console.log(process.env.DB_NAME)

  if (process.env.NODE_ENV !== "test") {
    throw new Error("🚨 Tests are NOT allowed outside test environment!");
  }
  if (!process.env.DB_NAME?.includes("test")) {
    throw new Error("🚨 Test DB must include 'test' in its name!");
  }

  await db.migrate.rollback()
  await db.migrate.latest()
  await db.seed.run()

  const user = await createTestUser(db);
  testUserId = user.id;

  const loginRes = await request(app)
  .post("/v1/authentication")
  .send({ email: user.email, password: user.password });

  (global as any).authToken = loginRes.body.access_token;
  (global as any).userId = testUserId
})

afterAll(async () => {
  if (testUserId) {
    await deleteTestUser(db, testUserId);
  }
  await db.destroy()
});
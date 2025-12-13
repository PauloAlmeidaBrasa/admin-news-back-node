import knex from "knex"
import knexConfig from "../config/db/knexfile.test"
import request from "supertest"
import app from "../app"
import { Test } from "supertest";


const db = knex(knexConfig)

beforeAll(async () => {

  await db.migrate.rollback()
  await db.migrate.latest()
  await db.seed.run()

  const loginRes = await request(app)
  .post("/v1/authentication")
  .send({ email: "paulo@eexample.com", password: "123456" })

  const userId = loginRes.body.user.id;
  const token = loginRes.body.access_token;


  (global as any).authToken = token;
  (global as any).userId = userId
})

afterAll(async () => {
  await db.destroy()
});


export function auth(req: Test) {
  return req.set(
    "Authorization",
    `Bearer ${(global as any).authToken}`
  );
}
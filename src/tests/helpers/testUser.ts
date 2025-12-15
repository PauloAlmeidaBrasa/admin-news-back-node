import { Knex } from "knex";
import bcrypt from "bcrypt"

function randomEmail() {
  return `test.user.${Date.now()}_${Math.random()
    .toString(36)
    .substring(2, 8)}@example.com`;
}

export async function createTestUser(db: Knex) {
  const password = await bcrypt.hash("123456", 10);
  const email = randomEmail();

  const [id] = await db("users").insert({
    name: "Test User",
    email: email,
    password,
    client_id: 1,
    created_at: new Date(),
    updated_at: new Date(),
    access_level: 1
  });

  return {
    id,
    email: email,
    password: "123456",
  };
}

export async function deleteTestUser(db: Knex, userId: number) {
  await db("users").where({ id: userId }).del();
}

import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { name: 'Paulo', email: "paulo@eexample.com", password: await bcrypt.hash("123456", 10), client_id: 1, access_level: 3 },
        { name: 'userEditor', email: "paulo@userEditor.com", password: await bcrypt.hash("123456", 10), client_id: 1, access_level: 1 },
    ]);
};

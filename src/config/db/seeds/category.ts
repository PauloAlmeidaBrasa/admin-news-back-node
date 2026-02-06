import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    if (process.env.APP_ENV === 'production') {
      throw new Error('🚫 Seeding is disabled in production');
    }
    // Deletes ALL existing entries
    await knex("category").del();

    // Inserts seed entries
    await knex("category").insert([
        { id: 1, name: 'cat 1', description: 'descriptio 1  ' },
        { id: 2, name: 'cat 2', description: 'description 2' },
        { id: 3, name: 'cat 3', description: 'description 3' },
        { id: 4, name: 'cat 4', description: 'description 4' }
    ]);
};

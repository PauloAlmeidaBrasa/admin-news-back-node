import type { Knex } from "knex";



export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique().index();
    table.string("password").notNullable();
    table.date('email_verified_at').nullable()
    table.string('remember_token').nullable()
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    table.integer('access_level').notNullable()

    table
      .integer("client_id")
      .unsigned()
      .references("id")
      .inTable("client")
      .onDelete("CASCADE")
      .index()
  });
}


export async function down(knex: Knex): Promise<void> {
  if (process.env.APP_ENV === 'production') {
    throw new Error('🚫 Rollbacks are disabled in production');
  }
  return knex.schema.dropTableIfExists("users");
}

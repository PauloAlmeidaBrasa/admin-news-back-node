import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("description").nullable()
    table.timestamps(true, true)

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
  return knex.schema.dropTableIfExists("category");
}

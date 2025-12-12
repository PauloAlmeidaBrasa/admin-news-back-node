import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("news", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable().index();
    table.string("subtitle").nullable()
    table.text('text').nullable()
    table.timestamps(true, true)

    table
      .integer("category_id")
      .unsigned()
      .references("id")
      .inTable("category")
      .onDelete("CASCADE")
      .index()

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
  return knex.schema.dropTableIfExists("news");
}

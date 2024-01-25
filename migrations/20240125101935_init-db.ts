import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('posts', (table) => {
        table.string('id', 25).primary();
        table.string('content', 280).notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now()).index();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('posts');
}


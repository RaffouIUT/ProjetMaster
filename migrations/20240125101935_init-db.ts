import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    // Table des intervenants
    await knex.schema.createTable('intervenants', (table) => {
        table.string('id', 25).primary();
        table.string('nom').notNullable();
        table.string('prenom').notNullable();
        table.string('mail').notNullable();
        table.string('login').notNullable();
        table.string('password').notNullable();
    });

    // Table des administrateurs
    await knex.schema.createTable('administrateurs', (table) => {
        table.string('id', 25).primary();
        table.string('mail').notNullable();
        table.string('login').notNullable();
        table.string('password').notNullable();
    });

    // Table des etudiants
    await knex.schema.createTable('etudiants', (table) => {
        table.string('id', 25).primary();
        table.string('nom').notNullable();
        table.string('prenom').notNullable();
        table.string('promotion').notNullable();
    });

    // Table des cours
    await knex.schema.createTable('cours', (table) => {
        table.string('id', 25).primary();
        table.string('nom').notNullable();
        table.timestamp('dateDebut').notNullable();
        table.timestamp('dateFin').notNullable();
        table.string('intervenantId', 25).notNullable().references('id').inTable('intervenants');
        table.string('promotionVisee').notNullable();
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
    });

    // Table des inscriptions
    await knex.schema.createTable('inscriptions', (table) => {
        table.string('coursId', 25).notNullable().references('id').inTable('cours');
        table.string('etudiantId', 25).notNullable().references('id').inTable('etudiants');
        table.primary(['coursId', 'etudiantId']);
    });
}

export async function down(knex: Knex): Promise<void> {
    // Supprimez les tables dans l'ordre inverse de la création pour éviter les problèmes de clés étrangères
    await knex.schema.dropTable('inscriptions');
    await knex.schema.dropTable('cours');
    await knex.schema.dropTable('etudiants');
    await knex.schema.dropTable('administrateurs');
    await knex.schema.dropTable('intervenants');
}

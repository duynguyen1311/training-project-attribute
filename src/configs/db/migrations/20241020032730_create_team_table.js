exports.up = function(knex) {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('team', function(table) {
            table.increments('id');
            table.uuid('teamId').primary().defaultTo(knex.raw('uuid_generate_v4()')).notNullable();
            table.string('teamName').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('team')
        .raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
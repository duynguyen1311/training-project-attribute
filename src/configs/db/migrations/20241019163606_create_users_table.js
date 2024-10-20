exports.up = function(knex) {
    return knex.schema
        .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .createTable('users', function(table) {
            table.increments('id');
            table.uuid('userId').primary().defaultTo(knex.raw('uuid_generate_v4()')).notNullable().unique();
            table.string('username').notNullable();
            table.string('email').notNullable();
            table.integer('roleId').references('roleId').inTable('roles');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('users')
        .raw('DROP EXTENSION IF EXISTS "uuid-ossp"');
};
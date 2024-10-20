exports.up = function(knex) {
    return knex.schema.createTable('team', function(table) {
        table.increments();
        table.uuid('teamId').primary().notNullable();
        table.string('teamName').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('team');
};

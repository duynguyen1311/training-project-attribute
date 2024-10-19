exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.uuid('userId ').notNullable();
        table.string('username ').notNullable();
        table.string('email').notNullable();
        table.integer('roleId').references('roleId').inTable('roles')
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};

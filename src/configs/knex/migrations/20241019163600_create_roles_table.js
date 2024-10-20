exports.up = function(knex) {
    return knex.schema.createTable('roles', function(table) {
        table.increments();
        table.integer('roleId ').primary().notNullable();
        table.string('roleName ').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('roles');
};

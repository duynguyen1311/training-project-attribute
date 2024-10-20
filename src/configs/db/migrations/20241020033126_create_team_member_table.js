exports.up = function(knex) {
    return knex.schema.createTable('team_members', function(table) {
        table.increments();
        table.uuid('teamId').references('teamId').inTable('team').nullable()
        table.uuid('managerId').references('userId').inTable('users').nullable();
        table.uuid('memberId').references('userId').inTable('users').nullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('team_members');
};

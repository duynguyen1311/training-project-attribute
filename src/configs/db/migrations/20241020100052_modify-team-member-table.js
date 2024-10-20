exports.up = function(knex) {
    return knex.schema.table('team_members', function(table) {
        table.renameColumn('managerId', 'userId');
        table.dropColumn('memberId');
        table.integer('roleId');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('team_members');
};

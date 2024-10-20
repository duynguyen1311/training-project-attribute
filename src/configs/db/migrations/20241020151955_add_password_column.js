exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
        table.string('password',255).notNullable().defaultTo('');
    })
};


exports.down = function(knex) {
    return knex.schema.table('team_members', function(table) {
        // Remove the column
        table.dropColumn('password');
    });
};

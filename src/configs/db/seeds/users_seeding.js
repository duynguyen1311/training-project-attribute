/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {userId: '9871ae1e-cff4-4757-abde-364535276ef1', username: 'manager_01', email: 'manager_01@gmail.com', roleId: 1, created_at: knex.fn.now(), updated_at: knex.fn.now()},
    {userId: '17401b64-6f43-45ea-866d-5da565a97760', username: 'member_01', email: 'member_01@gmail.com', roleId: 2, created_at: knex.fn.now(), updated_at: knex.fn.now()}
  ]);
};

/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('summaries').del()
    .then(() => {
      // Inserts seed entries
      return knex('summaries').insert([
        { user_id: 1, total_balance: '12335512.56' },
        { user_id: 2, total_balance: '93551234.89' },
        { user_id: 3, total_balance: '3551234.89' },
      ]);
    });
};

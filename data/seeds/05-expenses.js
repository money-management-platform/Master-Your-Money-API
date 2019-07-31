/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('expenses').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('expenses').insert([
        { user_id: 1, category_id: 1, description: 'House mortgage', amount: '23456.90' },
        { user_id: 2, category_id: 1, description: 'Education debt servicing', amount: '73456.90' },
        { user_id: 3, category_id: 1, description: 'Debt servicing', amount: '73456.90' },
      ]);
    });
};

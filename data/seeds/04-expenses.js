/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('expenses').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('expenses').insert([
        { user_id: 1, description: 'House mortgage', amount: '23,456.90' },
        { user_id: 2, description: 'Education debt servicing', amount: '73,456.90' },
      ]);
    });
};

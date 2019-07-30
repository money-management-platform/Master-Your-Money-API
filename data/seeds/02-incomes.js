/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('incomes').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('incomes').insert([
        { user_id: 1, description: 'Invest dividends', estimate: '123,456.90' },
        { user_id: 2, description: 'Invest returns', estimate: '723,456.90' },
      ]);
    });
};

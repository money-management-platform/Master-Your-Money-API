/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('incomes').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('incomes').insert([
        { user_id: 1, basis_id: 1, description: 'Invest dividends', estimate: '123345.45' },
        { user_id: 2, basis_id: 2, description: 'Invest returns', estimate: '72389.87' },
        { user_id: 3, basis_id: 3, description: 'Salary', estimate: '7109883.747' },
      ]);
    });
};


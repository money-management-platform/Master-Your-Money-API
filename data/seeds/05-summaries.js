/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('summaries').del()
    .then(() => {
      // Inserts seed entries
      return knex('summaries').insert([
        { user_id: 1, total_income: '123,984.89', total_expenses: '198, 847.23', total_balance: '123,355,1234'},
        { user_id: 2, total_income: '103,984', total_expenses: '28, 847.23', total_balance: '93,355,1234' },
      ]);
    });
};


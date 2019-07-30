/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bases').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('bases').insert([
        { income_id: 1, basis_title: 'Yearly' },
        { income_id: 2, basis_title: 'Weekly' },
      ]);
    });
};

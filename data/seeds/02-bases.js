/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('bases').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('bases').insert([
        { basis: 'Yearly' },
        { basis: 'Monthly' },
        { basis: 'Weekly' },
      ]);
    });
};

/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('categories').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('categories').insert([
        { category: 'Need' },
        { category: 'Want' },
      ]);
    });
};

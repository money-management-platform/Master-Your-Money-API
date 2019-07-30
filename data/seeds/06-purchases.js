/* eslint-disable func-names */

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('purchases').del()
    .then(() => {
      // Inserts seed entries
      return knex('purchases').insert([
        {
          user_id: 1, description: 'Car purchase', amount: '123,234,567', priority: 'luxury', 
        },
        {
          user_id: 2, description: 'House purchase', amount: '23,234,570', priority: 'necessity', 
        },
      ]);
    });
};

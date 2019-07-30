/* eslint-disable func-names */
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstname: 'John', lastname: 'Doe', email: 'johndoe@me.com', password: '1234567', address: 'Lambda School', occupation: 'Lambda PM', phone: '12345678900', marital_status: 'None',
        },
        {
          firstname: 'Jane', lastname: 'Doe', email: 'janedoe@me.com', password: '1234567', address: 'Lambda School', occupation: 'Lambda Founder', phone: '12345678901', marital_status: 'Married',
        },

      ]);
    });
};

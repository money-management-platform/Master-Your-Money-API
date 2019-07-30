import db from '../utils/dbConfig';

// SELECT SUM(estimate)
// FROM incomes
// WHERE user_id=4;

export const getIncome = () => db('incomes');

export const getIncomeById = id => db('incomes')
  .where({ id })
  .first();

// eslint-disable-next-line camelcase
export const getTotalIncome = user_id => db('incomes')
  .sum('estimate')
  .where({ user_id });

export const getUserByID = id => db('incomes')
  .where({ id })
  .first();

export const insert = income => db('incomes')
  .insert(income)
  .then(ids => getIncomeById(ids[0]));

export const update = (id, changes) => db('incomes')
  .where({ id })
  .update(changes);

export const remove = id => db('incomes')
  .where('id', id)
  .del();

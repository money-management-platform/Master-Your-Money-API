import db from '../utils/dbConfig';

export const getExpense = () => db('expenses')
  .join('categories', 'categories.id', 'category_id');

export const getExpenseById = id => db('expenses')
  .join('categories', 'expenses.category_id', 'categories.id')
  .where({ 'expenses.id': id })
  .first();

// eslint-disable-next-line camelcase
export const getTotalExpense = user_id => db('expenses')
  .sum('amount')
  .where({ user_id });

export const getUserByID = id => db('expenses')
  .where({ id })
  .first();

export const insert = income => db('expenses')
  .insert(income)
  .then(ids => getExpenseById(ids[0]));

export const update = (id, changes) => db('expenses')
  .where({ id })
  .update(changes);

export const remove = id => db('expenses')
  .where('id', id)
  .del();

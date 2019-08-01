import db from '../utils/dbConfig';

export const getExpense = id => db('expenses')
  .select('expenses.id', 'expenses.user_id', 'expenses.category_id', 'expenses.description', 'expenses.amount', 'categories.category', 'expenses.created_at')
  .join('categories', 'expenses.category_id', 'categories.id')
  .join('users', 'expenses.user_id', 'users.id')
  .where({ 'users.id': id });

export const getExpenseById = (id, userId) => db('expenses')
  .select('expenses.id', 'expenses.user_id', 'expenses.category_id', 'expenses.description', 'expenses.amount', 'categories.category', 'users.firstname', 'users.lastname', 'users.email', 'expenses.created_at')
  .join('categories', 'expenses.category_id', 'categories.id')
  .join('users', 'expenses.user_id', 'users.id')
  .where({ 'expenses.id': id, 'users.id': userId })
  .first();

// eslint-disable-next-line camelcase
export const getTotalExpense = user_id => db('expenses')
  .sum('amount')
  .where({ user_id });

export const getUserByID = id => db('expenses')
  .where({ id })
  .first();

export const insert = income => db('expenses')
  .insert(income);

export const update = (id, changes) => db('expenses')
  .where({ id })
  .update(changes);

// export const remove = (id, userId) => {
//   db('expenses')
//     .join('users', 'users.id', 'user_id')
//     .where({ id, userId })
//     .del();
// };

export const remove = async (id, userId) => {
  try {
    const expense = await getExpenseById(id, userId);
    if (!expense) {
      return null;
    }
    if (expense.user_id === userId) {
      const removeItem = await db('expenses')
        .where({ id })
        .del();
      return removeItem;
    }
  } catch (error) {
    return 'unable to remove';
  }
};

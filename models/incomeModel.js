import db from '../utils/dbConfig';

export const getIncome = id => db('incomes')
  .select('incomes.id', 'incomes.user_id', 'incomes.basis_id', 'incomes.description', 'incomes.estimate', 'bases.basis', 'incomes.created_at')
  .join('bases', 'incomes.basis_id', 'bases.id')
  .join('users', 'incomes.user_id', 'users.id')
  .where({ 'users.id': id });


export const getIncomeById = (id, userId) => db('incomes')
  .select('incomes.id', 'incomes.user_id', 'incomes.basis_id', 'incomes.description', 'incomes.estimate', 'bases.basis', 'users.firstname', 'users.lastname', 'users.email', 'incomes.created_at')
  .join('bases', 'incomes.basis_id', 'bases.id')
  .join('users', 'incomes.user_id', 'users.id')
  .where({ 'incomes.id': id, 'users.id': userId })
  .first();

// eslint-disable-next-line camelcase
export const getTotalIncome = user_id => db('incomes')
  .sum('estimate')
  .where({ user_id });

export const getUserByID = id => db('incomes')
  .where({ id })
  .first();

export const insert = income => db('incomes')
  .insert(income);

export const update = (id, changes) => db('incomes')
  .where({ id })
  .update(changes);

export const remove = async (id, userId) => {
  try {
    const income = await getIncomeById(id, userId);
    if (!income) {
      return null;
    }
    if (income.user_id === userId) {
      const removeItem = await db('incomes')
        .where({ id })
        .del();
      return removeItem;
    }
  } catch (error) {
    return 'unable to emove';
  }
};

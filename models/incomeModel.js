import db from '../utils/dbConfig';

// SELECT SUM(estimate)
// FROM incomes
// WHERE user_id=4;

// export function getProject(id) {
//   return db('actions')
//     .join('projects', 'projects.id', 'project_id')
//     .select('actions.*', 'projects.*')
//     .where('project_id', id);
// }

export const getIncome = () => db('incomes')
  .join('bases', 'bases.id', 'basis_id');

// SELECT * , bases.basis
// FROM incomes
// INNER JOIN bases ON incomes.basis_id=bases.id
// where incomes.id = 1;

export const getIncomeById = id => db('incomes')
  .join('bases', 'incomes.basis_id', 'bases.id')
  .where({ 'incomes.id': id })
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

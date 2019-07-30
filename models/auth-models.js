import db from '../utils/dbConfig';

export const get = () => db('users');

export const getById = id => db('users')
  .where({ id })
  .first();

export const getByUsername = username => db('users')
  .where({ username })
  .first();


export const insert = user => db('users')
  .insert(user)
  .then(ids => getById(ids[0]));

export const update = (id, changes) => db('users')
  .where({ id })
  .update(changes);

export const remove = id => db('users')
  .where('id', id)
  .del();

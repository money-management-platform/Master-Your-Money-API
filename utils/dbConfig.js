import knex from 'knex';
import configOptions from '../knexfile';

const option = configOptions.development;
export default knex(option);

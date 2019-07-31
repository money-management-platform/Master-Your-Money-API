
/* eslint-disable func-names */

exports.up = function (knex) {
  return knex.schema
    .createTable('users', (table) => {
      table.increments();
      table.text('firstname').notNullable();
      table.text('lastname').notNullable();
      table.text('email').notNullable().unique();
      table.text('password').notNullable();
      table.text('address').notNullable();
      table.text('occupation').notNullable();
      table.text('phone').notNullable();
      table.text('marital_status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('incomes', (table) => {
      table.increments();
      table.string('description').notNullable();
      table.decimal('estimate', 10, 2).notNullable();
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('basis_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('bases')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('bases', (table) => {
      table.increments();
      table.string('basis').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('expenses', (table) => {
      table.increments();
      table.text('description').notNullable();
      table.decimal('amount', 10, 2).notNullable();
      table.integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('summaries', (table) => {
      table.increments();
      table.decimal('total_balance', 10, 2);
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('categories', (table) => {
      table.increments();
      table.text('category');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('incomes')
    .dropTableIfExists('bases')
    .dropTableIfExists('expenses')
    .dropTableIfExists('summaries')
    .dropTableIfExists('categories');
};

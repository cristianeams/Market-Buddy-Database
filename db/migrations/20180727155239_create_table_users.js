
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('avatar').notNullable();
    table.string('password').notNullable();
    table.integer('points').notNullable().defaultTo(0);
    table.boolean('isadmin').notNullable().defaultTo(false);
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
}


exports.up = function(knex, Promise) {
  return knex.schema.createTable('stores', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('location').notNullable();
    table.string('latitude').notNullable();
    table.string('longitude').notNullable();
    table.string('logo').notNullable();
    table.string('website').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('stores');
}

exports.up = function(knex, Promise) {
  return knex.schema.createTable('lists', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    
    table.integer('user_id').notNullable()
    .references('id').inTable('users').onDelete('cascade');

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('lists');
}

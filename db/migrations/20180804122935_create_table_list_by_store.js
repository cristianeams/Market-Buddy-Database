
exports.up = function(knex, Promise) {
  return knex.schema.createTable('list_by_store', function(table) {
    table.increments('id').primary();

    table.integer('list_id').notNullable()
    .references('id').inTable('lists').onDelete('cascade');

    table.integer('store_id').notNullable()
    .references('id').inTable('products').onDelete('cascade');

    table.decimal('total',8).notNullable();

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('list_by_store');
}


exports.up = function(knex, Promise) {
  return knex.schema.createTable('prices', function(table) {
    table.increments('id').primary();
    table.decimal('price',8).notNullable();

    table.integer('product_id').notNullable()
    .references('id').inTable('products').onDelete('cascade');

    table.integer('store_id').notNullable()
    .references('id').inTable('stores').onDelete('cascade');

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('prices');
}
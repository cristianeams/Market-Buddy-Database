
exports.up = function(knex, Promise) {
  return knex.schema.createTable('entries', function(table) {
    table.increments('id').primary();
    table.integer('quantity').notNullable().defaultTo(1);
    table.string('notes');

    table.integer('list_id').notNullable()
    .references('id').inTable('lists').onDelete('cascade');

    table.integer('product_id').notNullable()
    .references('id').inTable('products').onDelete('cascade');

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('entries');
}

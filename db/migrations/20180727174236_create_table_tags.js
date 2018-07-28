
exports.up = function(knex, Promise) {
  return knex.schema.createTable('tags', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();

    table.integer('category_id').notNullable()
    .references('id').inTable('categories').onDelete('cascade');

    table.integer('product_id').notNullable()
    .references('id').inTable('products').onDelete('cascade');

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('tags');
}
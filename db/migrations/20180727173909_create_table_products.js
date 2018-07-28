
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('upc').notNullable();
    table.string('ean').notNullable();
    table.string('image').notNullable();
    table.string('brand').notNullable();

    table.integer('category_id').notNullable()
    .references('id').inTable('categories').onDelete('cascade');

    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
}

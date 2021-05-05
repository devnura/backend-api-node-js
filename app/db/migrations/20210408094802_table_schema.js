
exports.up = function(knex) {
    return knex.schema
    .createTable('users', function (table) {
       table.increments('id').primary();
       table.string('username', 32).unique().notNullable();
       table.string('name', 64).notNullable();
       table.string('password', 255).notNullable();
       table.string('role', 1).notNullable();
       table.timestamp('created_at').defaultTo(knex.fn.now());
       table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
    .createTable('products', function (table) {
       table.increments('id').primary();
       table.string('product_name', 64).unique().notNullable();
       table.integer('purchase_price').notNullable();
       table.integer('selling_price').notNullable();
       table.integer('stock').notNullable();
       table.timestamp('created_at').defaultTo(knex.fn.now());
       table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable("products")
    .dropTable("users");
};

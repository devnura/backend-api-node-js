
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('products').del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {product_name: 'Better', purchase_price: 800, selling_price: 1000, stock: 200},
        {product_name: 'Beng-beng', purchase_price: 1200, selling_price: 1500, stock: 100},
        {product_name: 'Goodtime', purchase_price: 800, selling_price: 1000, stock: 150},
        {product_name: 'Top', purchase_price: 800, selling_price: 1000, stock: 220},
        {product_name: 'Tim-tam', purchase_price: 800, selling_price: 1000, stock: 100}
      ]);
    });
};

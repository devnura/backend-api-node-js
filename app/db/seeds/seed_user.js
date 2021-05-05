const bcrypt = require('bcrypt')
const saltRounds = 10;

const password = bcrypt.hashSync("password", saltRounds); 

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: "jhonwijck", name: 'Jhon Wijck Setiawan', password:password, role:"1"},
        {username: "superman", name: 'Jhon Doe Setiawan', password:password, role:"2"}
      ]);
    });
};

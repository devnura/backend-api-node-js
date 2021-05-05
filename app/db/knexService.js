const knex = require('knex');

const knexFile = require('./knexfile');

const db_knex = knex(knexFile.development)

module.exports = db_knex;

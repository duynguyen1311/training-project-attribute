const knex = require('knex');

const knexFileConfig = require('../../../knexfile.js')

const env = process.env.NODE_ENV || 'development';

const configOptions = knexFileConfig[env];

module.exports = knex(configOptions)
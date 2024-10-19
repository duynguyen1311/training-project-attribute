const environment = process.env.DEV_ENVIRONMENT || 'development'
const config = require('../../knexfile.js')[environment];
module.exports = require('knex')(config);
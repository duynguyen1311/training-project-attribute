require('dotenv').config();

module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 5432,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            charset: 'utf8'
        },
        migrations: {
            directory: __dirname + '/configs/knex/migrations',
        },
        seeds: {
            directory: __dirname + '/configs/knex/seeds'
        }
    }
};

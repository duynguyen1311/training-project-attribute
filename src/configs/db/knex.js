// knex.js

const knex = require('knex');
const knexFileConfig = require('../../../knexfile.js')
const env = process.env.NODE_ENV || 'development';
const configOptions = knexFileConfig[env];

class DatabaseSingleton {
    constructor() {
        if (!DatabaseSingleton.instance) {
            this._knex = knex(configOptions);
            DatabaseSingleton.instance = this;
        }

        return DatabaseSingleton.instance;
    }

    get knex() {
        return this._knex;
    }

    closeConnection() {
        if (this._knex) {
            this._knex.destroy();
        }
    }
}

const instance = new DatabaseSingleton();
Object.freeze(instance);

module.exports = instance;
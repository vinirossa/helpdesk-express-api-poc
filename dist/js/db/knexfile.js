"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            database: process.env.DB_DEFAULT_DB,
            user: process.env.DB_USER,
            password: process.env.DB_PWD,
        },
    },
    staging: {
        client: 'pg',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    production: {
        client: 'pg',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};
exports.default = config;
//# sourceMappingURL=knexfile.js.map
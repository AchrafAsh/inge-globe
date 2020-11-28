module.exports = {
    development: {
        client: 'postegresql',
        connection: process.env.DB_URI,
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postegresql',
        connection: process.env.DB_URI,
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}

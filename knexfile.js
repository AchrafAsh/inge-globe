module.exports = {
    production: {
        client: 'postgres',
        connection: process.env.DB_URI,
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}

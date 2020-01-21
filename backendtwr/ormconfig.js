module.exports = {
    "type": "postgres",
    "host": "db",
    "port": 5432,
    "username": process.env.POSTGRES_USER,
    "password": process.env.POSTGRES_PASSWORD,
    "database": process.env.POSTGRES_DB,
    "synchronize": false,
    "logging": true,
    "entities": ["./dist/**/*.entity.js", "./dist/**/**/*.entity.js", "./src/**/*.entity.ts", "./src/**/**/*.entity.ts"],
    "migrations": ["migration/*.js"],
    "cli": {
        "migrationsDir": "migration"
    }
}
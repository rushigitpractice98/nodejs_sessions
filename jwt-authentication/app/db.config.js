module.exports = {
    HOST: "localhost",
    USER: "postfgres",
    PASSWORD: "123",
    DB: "texstdb",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}
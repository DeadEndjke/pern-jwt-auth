const {Sequelize} = require("sequelize")

module.exports = new Sequelize(

    'jwt-auth',
    'postgres',
    'root',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
    }
)


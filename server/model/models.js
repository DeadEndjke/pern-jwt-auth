const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const UserModel = sequelize.define('UserModel',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email:{type: DataTypes.STRING, unique: true},
    password :{type: DataTypes.STRING, unique: true},
})

const TokenModel = sequelize.define('TokenModel',{
    refreshToken:{type: DataTypes.STRING},
})

UserModel.hasOne(TokenModel)
TokenModel.belongsTo(UserModel)

module.exports = {
    UserModel, TokenModel
}

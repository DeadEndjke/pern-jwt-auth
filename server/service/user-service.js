const {UserModel, TokenModel} = require('../model/models')
const bcrypt = require("bcrypt");
const TokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService{
    async registration(email, password){
        const candidate = await UserModel.findOne({where:{email}})
        if(candidate){
            throw ApiError.badRequest(`User with email ${email} already exist`)
        }
        const hashPassword = await bcrypt.hash(password, 3)
        const user = await UserModel.create({email, password: hashPassword})
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})
        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password){
        const user = await UserModel.findOne({where:{email}})
        if(!user){
            throw ApiError.badRequest(`User with email ${email} doesn't exist`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if(!isPassEquals){
            throw ApiError.badRequest('uncorrected password')
        }
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken){
        return await TokenService.removeToken(refreshToken)
    }
    async refresh(refreshToken){
        if(!refreshToken){
            // throw new ApiError.unauthorizedError("capec")
            console.log('net refreshtokena')
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await TokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb){
            // throw ApiError.unauthorizedError("capec")
            console.log('net userDati i tokenaisdb')
        }
        const user = await UserModel.findByPk(userData.id)
        const userDto = new UserDto(user)
        const tokens = TokenService.generateTokens({...userDto})

        await TokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }
}

module.exports = new UserService()
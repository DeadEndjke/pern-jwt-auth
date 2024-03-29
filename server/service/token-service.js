const jwt = require('jsonwebtoken')
const {TokenModel} = require('../model/models')

class TokenService{
    generateTokens(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        }catch (err){
            return null
        }
    }
    validateRefreshToken(token){
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        }catch (err){
            return null
        }
    }

    async saveToken(userId, refreshToken){
        const tokenData = await TokenModel.findOne({user: userId})
        if(tokenData){
            tokenData.refreshToken = refreshToken
            return tokenData.save();
        }
        return await TokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken){
        return await TokenModel.destroy({where:{refreshToken}})
    }
    async findToken(refreshToken){
        return await TokenModel.findOne({where:{refreshToken}})
    }

}

module.exports = new TokenService()
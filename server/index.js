require('dotenv').config()
const {Client} = require("pg");
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 5000
const app = express()
const router = require('./router/index')
const sequelize = require('./database')
const errorMiddleware = require('./middlewares/error-middleware')
const models = require('./model/models')
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))
app.use('/api', router)
app.use(errorMiddleware)


const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT)
    }catch (e){
        console.log(e)
    }
}

start()
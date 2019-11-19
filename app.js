if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
    console.log('------ under' , process.env.NODE_ENV)
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const mongo = require('./helper/mongo')
const server = require('http').Server(app)

mongo()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

server.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = server



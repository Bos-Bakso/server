if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    require('dotenv').config()
    console.log('development-----')
}
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const router = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const mongo = require('./helper/mongo')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const rank = require('./helper/rank')

mongo()

app.use(cors())
io.on('connect', async(socket) => {
    console.log('connect socket yeay ')
    let data = await rank() 
    socket.on('add', function(){
        io.emit('test' ,  data )   
    })
    io.emit('test' ,  data )

    socket.on('disconnect', function(){
        socket.disconnect()
    })
})

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

server.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = server



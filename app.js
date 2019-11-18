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
const mongoose = require('mongoose')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const rank = require('./helper/rank')


if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
    mongoose.connect(`mongodb://localhost/initBosBakso_${process.env.NODE_ENV}`, 
        {   useNewUrlParser: true , 
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify : false
        }, 
        () => {
            console.log('connected to mongodb LOCAL')
    })
} else {
    mongoose.connect(process.env.MONGOATLAS, 
        {   useNewUrlParser: true , 
            useUnifiedTopology: true,
            useCreateIndex : true,
            useFindAndModify : false
        }, 
        () => {
            console.log('connected to mongodb ATLAS')
    })
}

app.use(cors())
io.on('connect', async(socket) => {
    let data = await rank() 
    socket.on('add', function(){
        io.emit('test' ,  data )   
    })
    io.emit('test' ,  data )

})
app.use((req, res, next) => {
    req.io = io
    next()
})
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

// app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))
server.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = server



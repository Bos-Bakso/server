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

io.on('connect', (socket) => {
    socket.emit('test' , { message : 'test', serviceCreated })
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

// app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))
server.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = server



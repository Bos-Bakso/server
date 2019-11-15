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

mongoose.connect(`mongodb://localhost/initBosBakso_${process.env.NODE_ENV}`, 
    { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex : true }, 
    () => {
        console.log('connected to mongodb')
})
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/', router)
app.use(errorHandler)

app.listen(PORT , _ => console.log(`running on port PORT ${PORT}`))

module.exports = app



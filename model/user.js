const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { hash } =require('../helper/bcrypt')

const User = new Schema({    
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    history : [
        { type : Schema.Types.ObjectId, ref : 'transaction' }
    ],
    role : {
        type : String,
        default : "baso"
    },
    latitude : {
        type : Number,
        default : 0
    },
    longitude : {
        type : Number,
        default : 0
    },
    image : {
        type : String,
    }
})

User.pre('save' , function(next){
    this.password = hash(this.password)
    next()
})

const Model = mongoose.model('user', User)
module.exports = Model


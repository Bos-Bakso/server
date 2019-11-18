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
    isOwner : {
        type : Boolean,
        default : false
    },
    role : {
        type : String,
        default : 'baso'
    },
    latitude : {
        type : Number,
        default : -6.260762
    },
    longitude : {
        type : Number,
        default : 106.781461
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


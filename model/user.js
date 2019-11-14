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
        default : 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
    }
})

User.pre('save' , function(next){
    this.password = hash(this.password)
    next()
})

const Model = mongoose.model('user', User)
module.exports = Model


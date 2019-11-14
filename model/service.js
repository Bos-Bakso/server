const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Service = new Schema({
    tukangBasoId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    problem : {
        type : String,
        required : [true, 'problem required']
    },
    price : {
        type : Number,
        required : [true , 'price requied']
    },
    solve : {
        type : Boolean,
        default : false
    },
    latitude : {
        type : Number,
        required : [true, 'latitude rqeuired']
    },
    longitude : {
        type : Number,
        required : [true, 'longitude required']
    }
})

const Model = mongoose.model('service', Service)
module.exports = Model
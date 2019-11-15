const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema({
    bowl : {
        type : Number,
        default : 1
    },
    tukangBaksoId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    latitude : {
        type : Number
    },
    longitude : {
        type : Number
    }
}, { timestamps : true })

const Model = mongoose.model('transaction', Transaction)
module.exports = Model
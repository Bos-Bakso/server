const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Transaction = new Schema({
    bowlQty : {
        type : Number,
        default : 0
    },
    date : {
        type : Date,
        default : new Date()
    },
    tukangBaksoId : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    }
})

const Model = mongoose.model('transaction', Transaction)
module.exports = Model
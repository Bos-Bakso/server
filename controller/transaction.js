const Transaction = require('../model/transaction')
const moment = require('moment')
const today = moment().startOf('day')
const ObjectId = require('mongoose').Types.ObjectId

class Controller {
    static addBowl(req,res,next){
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        Transaction.create({ tukangBaksoId : req.loggedUser._id, latitude, longitude })
        .then( data => {
            res.status(201).json({ message : 'data added to database', data})
        })
        .catch(next)
    }
    static find(req,res,next){
        Transaction.find()
        .then(penjualanBakso => {
            res.status(200).json({penjualanBakso})
        })
        .catch(next)
    }
    static getTukangBaksoBowlQty(req,res,next){
        const { _id } = req.loggedUser
        Transaction.find({ tukangBaksoId : new ObjectId(_id), createdAt : {
            $gte : today.toDate(),
            $lte : moment(today).endOf('day').toDate()
        } })
        .then(data => {
            const qty = data.length
            res.status(200).json({data, qty, message : 'fetch success'})
        })
        .catch(next)
    }
}

module.exports = Controller
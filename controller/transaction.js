const Transaction = require('../model/transaction')

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
}

module.exports = Controller
const Service = require('../model/service')

class Controller {
    static addService(req,res,next){
        const problem = req.body.problem
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        Service.create({ 
            problem,
            latitude,
            longitude,
            tukangBasoId : req.loggedUser._id
         })
        .then(serviceCreated => {
            res.status(201).json({serviceCreated, message: 'Service added to database'})
        })
        .catch(next)
    }

    static updateService(req,res,next){
       Service.findOneAndUpdate({ _id : req.params.id }, { solve : true }) 
       .then( data => {
           res.status(200).json({data})
       })
       .catch(next)
    }
}

module.exports = Controller
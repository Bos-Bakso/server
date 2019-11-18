const Service = require('../model/service')

class Controller {
    static addService(req, res, next) {
        const problem = req.body.problem
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        console.log('add service triggered', problem, latitude, longitude)
        Service.create({
            problem,
            latitude,
            longitude,
            tukangBasoId: req.loggedUser._id
        })
            .then(serviceCreated => {
                // req.io.emit('newService' , { data : serviceCreated , message : "ada yg baru nih" } )
                res.status(201).json({ serviceCreated, message: 'Service added to database' })
            })
            .catch(next)
    }

    static updateService(req, res, next) {
        console.log('update service triggered', req.params.id)
        Service.findOneAndUpdate({ _id: req.params.id }, { solve: true })
            .then(data => {
                res.status(200).json({ data })
            })
            .catch(next)
    }

    static find(req,res,next){
        Service.find().populate('tukangBasoId')
        .then(data => {
            res.status(200).json({ service : data})
        })
        .catch(next)
    }
}

module.exports = Controller
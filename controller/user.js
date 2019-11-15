const User = require('../model/user')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static registerAdmin(req,res,next){
        const username = req.body.username
        const password = req.body.password
        const isOwner = true
        let image;
        if(req.file){
            image = req.file.cloudStoragePublicUrl
        } else {
            image = 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
        }
        User.findOne({ username })
        .then( existingUser  => {
            if(existingUser){
                throw next({ name : 'duplicationError'})
            }else {
                return User.create({ username, password, image, isOwner })
            }
        })
        .then( user => {
            res.status(201).json({ message : `${user.username} created`, user })
        })
        .catch(next)
    }
    
    static addTukangBaso(req,res,next){
        const username = req.body.username
        const password = req.body.password
        let image;
        if(req.file){
            image = req.file.cloudStoragePublicUrl
        }else{
            image = 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
        }
        User.findOne({ username })
        .then( existingUser  => {
            if(existingUser){
                throw next({ name : 'duplicationError'})
            }else {
                return User.create({username, password, image })
            }
        })
        .then( user => {
            res.status(201).json({ message : `${user.username} created`, user })
        })
        .catch(next)
    }

    static pecatTukangBaso(req,res,next){
        const { id } = req.params
        User.findByIdAndDelete({ _id : id })
        .then( deletedUser => {
            if(deletedUser){
                res.status(200).json({deletedUser})
            }
        })
        .catch(next)
    }

    static login(req,res,next){
        const username = req.body.username
        const password = req.body.password
        User.findOne({username})
        .then(user => {
            if(!user){
                throw next({ name : 'LoginError'})
            }else {
                if(compare(password, user.password)){
                    const { _id, username, isOwner, latitude, longitude, history } = user
                    const payload = { 
                        _id, username, isOwner, latitude, longitude, history
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token, isOwner})
                }else{
                    throw next({ name : 'LoginError'})
                }
            }
        })
        .catch(next)
    }

    static updateLocation(req,res,next){
        const latitude = req.body.latitude
        const longitude = req.body.longitude
        const username = req.loggedUser.username
        const _id = req.loggedUser._id
        User.findOneAndUpdate({ username, _id  }, { latitude, longitude })
        .then(updatedData => {
            res.status(200).json({ updatedData })
        })
        .catch(next)
    }

    static find(req,res,next){
        User.find()
        .then( user => {
            res.status(200).json(user)
        })
        .catch(next)
    }    
}

module.exports = Controller
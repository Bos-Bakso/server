const User = require('../model/user')
const { compare } = require('../helper/bcrypt')
const { generateToken } = require('../helper/jwt')

class Controller {
    static registerAdmin(req,res,next){
        const username = req.body.username
        const password = req.body.password
        const facebook = req.body.facebook
        const isOwner = true
        const role = 'admin'
        let image;
        /* istanbul ignore next */
        if(req.file){
            /* istanbul ignore next */
            image = req.file.cloudStoragePublicUrl
        } else {
            image = 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
        }
        User.findOne({ username })
        .then( existingUser  => {
            if(existingUser){
                throw next({ name : 'duplicationError'})
            }else {
                return User.create({ username, password, image, isOwner , role, facebook })
            }
        })
        .then( user => {
            res.status(201).json({ message : `${user.username} created`, user })
        })
        .catch(next)
    }
    
    static addAbang(req,res,next){
        const username = req.body.username
        const password = req.body.password
        const role = req.body.role
        const facebook = req.body.facebook
        let image;
        /* istanbul ignore next */
        if(req.file){
            /* istanbul ignore next */
            image = req.file.cloudStoragePublicUrl
        }else{
            image = 'https://porteous.com.au/wp-content/uploads/2016/09/dummy-profile-pic-male-300x300.jpg'
        }
        User.findOne({ username })
        .then( existingUser  => {
            if(existingUser){
                throw next({ name : 'duplicationError'})
            }else {
                return User.create({username, password, image, role, facebook })
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
            /* istanbul ignore next */
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
                    const { _id, username, isOwner, latitude, longitude, history, image, role, facebook } = user
                    const payload = { 
                        _id, username, isOwner, latitude, longitude, history, image, role, facebook
                    }
                    const token = generateToken(payload)
                    res.status(200).json({token, isOwner, username, latitude, longitude, history, image, role, _id})
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
        console.log('update Location Triggered', _id , latitude, longitude)
        User.findOneAndUpdate({ username, _id  }, { latitude, longitude })
        .then(updatedData => {
            res.status(200).json({ updatedData })
        })
        .catch(next)
    }
    
    static find(req,res,next){
        User.find({isOwner : false}).sort({ createdAt : 'desc'})
        .then( user => {
            console.log('user', user)
            res.status(200).json(user)
        })
        .catch(next)
    }

}

module.exports = Controller
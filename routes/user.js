const router = require('express').Router()
const Controller = require('../controller/user')
const { authentication, authorization } = require('../middleware/auth')

router.get('/', Controller.find)
router.post('/login', Controller.login)
router.patch('/', authentication, authorization, Controller.updateLocation)
router.delete('/:id', authentication, authorization ,Controller.pecatTukangBaso )
router.post('/add' , authentication, authorization ,Controller.addTukangBaso)

module.exports = router
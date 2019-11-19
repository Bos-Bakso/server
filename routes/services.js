const router = require('express').Router()
const Controller = require('../controller/service')
const { authentication, authorizationService } = require('../middleware/auth')

router.post('/', authentication ,Controller.addService)
router.patch('/:id', authentication, authorizationService, Controller.updateService)
router.get('/', authentication, Controller.find)


module.exports = router
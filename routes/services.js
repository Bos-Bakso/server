const router = require('express').Router()
const Controller = require('../controller/service')
const { authentication, authorization } = require('../middleware/auth')

router.post('/', authentication ,Controller.addService)
router.patch('/:id', authentication, authorization, Controller.updateService)
router.get('/', authentication, Controller.find)


module.exports = router
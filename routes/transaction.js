const router = require('express').Router()
const Controller = require('../controller/transaction')
const { authentication, authorization } = require('../middleware/auth')

router.post('/' , authentication , Controller.addBowl)
router.get('/', authentication, authorization, Controller.find)

module.exports = router
const router = require('express').Router()
const user = require('./user')
const transaction = require('./transaction')
const service = require('./services')

router.use('/user', user)
router.use('/transaction', transaction)
router.use('/service', transaction)

module.exports = router
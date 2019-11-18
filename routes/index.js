const router = require('express').Router()
const user = require('./user')
const transaction = require('./transaction')
const service = require('./services')
const rank = require('../helper/rank')

router.use('/user', user)
router.use('/transaction', transaction)
router.use('/service', service)
router.get('/rank',  async (req,res) => {
    let data = await rank()
    res.status(200).json({ rank : data })
})

module.exports = router
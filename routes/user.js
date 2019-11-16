const router = require('express').Router()
const Controller = require('../controller/user')
const { authentication, authorization } = require('../middleware/auth')
const { multer , sendUploadToGCS } = require('../helper/multer')

router.get('/',Controller.find)
router.patch('/', authentication, Controller.updateLocation)
router.post('/login', Controller.login)
router.post('/registerAdmin', multer.single('image'), sendUploadToGCS ,Controller.registerAdmin )
router.post('/add' , authentication, authorization, multer.single('image'), sendUploadToGCS ,Controller.addTukangBaso)
router.delete('/:id', authentication, authorization ,Controller.pecatTukangBaso )

module.exports = router
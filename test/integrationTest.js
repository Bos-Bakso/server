const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const User = require('../model/user')
const Transaction = require('../model/transaction')

chai.use(chaiHttp)

describe('TDD', function () {
    let tokenAdmin;
    let tokenTukangBaso;
    let tukangBasoIdToDelete;
    let idServiceToSolve;
    let tokenTukangService;

    before(async function () {
        await User.deleteMany({})
        await Transaction.deleteMany({})
    })

    describe('User test', function () {

        it('admin register', function (done) {
            let body = {
                username: 'adminTest01',
                password: 'adminTest01',
                facebook: 'urlfacebok'
            }
            chai.request(app)
                .post('/user/registerAdmin')
                .send(body)
                .end(function (err, res) {
                    const message = res.body.message
                    const user = res.body.user
                    expect(message).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('isOwner')
                    expect(user).to.have.property('image')
                    expect(user).to.have.property('latitude')
                    expect(user).to.have.property('longitude')
                    expect(user).to.have.property('history')
                    expect(user.isOwner).to.be.equals(true)
                    done()
                })
        })

        it('admin register username already in use', function (done) {
            let bodyRegisterFail = {
                username: 'adminTest01',
                password: 'adminTest01',
                facebook: 'urlfacebok'
            }
            chai.request(app)
                .post('/user/registerAdmin')
                .send(bodyRegisterFail)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('username already in use')
                    done()
                })
        })

        it('admin login', function (done) {
            let bodyLogin = {
                username: 'adminTest01',
                password: 'adminTest01',
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyLogin)
                .end(function (err, res) {
                    const token = res.body.token
                    const isOwner = res.body.isOwner
                    expect(token).to.be.a('String')
                    expect(isOwner).to.be.a('Boolean')
                    expect(isOwner).to.be.equals(true)
                    tokenAdmin = token
                    done()
                })
        })

        it('add tukang baso success', function (done) {
            let bodyAddTukangBaso = {
                username: 'tukangBaso1',
                password: 'tukangBaso1',
                facebook: 'urlfacebok',
                role : 'baso'
            }
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBaso)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    const user = res.body.user
                    expect(message).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('isOwner')
                    expect(user).to.have.property('image')
                    expect(user).to.have.property('latitude')
                    expect(user).to.have.property('longitude')
                    expect(user).to.have.property('history')
                    expect(user).to.have.property('_id')
                    expect(user).to.have.property('role')
                    expect(user.role).to.be.equals('baso')
                    expect(user.isOwner).to.be.equals(false)
                    done()
                })
        })

        it('add tukang baso success', function (done) {
            let bodyAddTukangBasoDelete = {
                username: 'tukangBasoDelete',
                password: 'tukangBasoDelete',
                role : 'baso',
                facebook: 'urlfacebok'
            }
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoDelete)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    const user = res.body.user
                    expect(message).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('isOwner')
                    expect(user).to.have.property('image')
                    expect(user).to.have.property('latitude')
                    expect(user).to.have.property('longitude')
                    expect(user).to.have.property('history')
                    expect(user).to.have.property('_id')
                    expect(user).to.have.property('role')
                    expect(user.role).to.be.equals('baso')
                    expect(user.isOwner).to.be.equals(false)
                    tukangBasoIdToDelete = user._id
                    done()

                })
        })

        it('add tukang service success', function (done) {
            let bodyAddTukangBasoDelete = {
                username: 'tukangService',
                password: 'tukangService',
                facebook: 'urlfacebok',
                role : 'service'
            }
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoDelete)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    const user = res.body.user
                    expect(message).to.be.a('String')
                    expect(user).to.be.an('Object')
                    expect(user).to.have.property('username')
                    expect(user).to.have.property('password')
                    expect(user).to.have.property('isOwner')
                    expect(user).to.have.property('image')
                    expect(user).to.have.property('latitude')
                    expect(user).to.have.property('longitude')
                    expect(user).to.have.property('history')
                    expect(user).to.have.property('_id')
                    expect(user).to.have.property('role')
                    expect(user.role).to.be.equals('service')
                    expect(user.isOwner).to.be.equals(false)
                    tukangBasoIdToDelete = user._id
                    done()
                })
        })

        it('login tukang service success', function (done) {
            let bodyTukangBasoLogin = {
                username: 'tukangService',
                password: 'tukangService',
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyTukangBasoLogin)
                .end(function (err, res) {
                    const token = res.body.token
                    const role = res.body.role
                    expect(token).to.be.a('String')
                    expect(role).to.be.a('String')
                    expect(role).to.be.equal('service')
                    tokenTukangService = token
                    done()
                })
        })


        it('login tukang baso success', function (done) {
            let bodyTukangBasoLogin = {
                username: 'tukangBaso1',
                password: 'tukangBaso1',
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyTukangBasoLogin)
                .end(function (err, res) {
                    const token = res.body.token
                    const isOwner = res.body.isOwner
                    expect(token).to.be.a('String')
                    expect(isOwner).to.be.a('Boolean')
                    expect(isOwner).to.be.equals(false)
                    tokenTukangBaso = token
                    done()
                })
        })

        it('login tukang baso fail', function (done) {
            let bodyAddTukangBasoFail3 = {
                username: 'tukangBaso1',
                password: 'random'
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyAddTukangBasoFail3)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('wrong username/password')
                    done()
                })
        })

        it('login tukang baso fail', function (done) {
            let bodyAddTukangBasoFail3 = {
                username: 'random',
                password: 'random'
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyAddTukangBasoFail3)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('wrong username/password')
                    done()
                })
        })

        it('add tukang baso fail authfail', function (done) {
            let bodyAddTukangBasoFail = {
                username: 'tukangBaso1',
                password: 'tukangBaso1',
                facebook: 'urlfacebok'
            }
            let headers = {
                token: 'FAILTOKEN'
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoFail)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('add tukang baso fail authfail2', function (done) {
            let bodyAddTukangBasoFail2 = {
                username: 'tukangBaso1',
                password: 'tukangBaso1',
                facebook: 'urlfacebok'
            }
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoFail2)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authorization error')
                    done()
                })
        })

        it('add tukang baso duplication user name', function (done) {
            let bodyAddTukangBaso = {
                username: 'tukangBaso1',
                password: 'tukangBaso1',
                facebook: 'urlfacebok'
            }
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBaso)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('username already in use')
                    done()
                })
        })

        it('add tukang baso validation error', function (done) {
            let bodyAddTukangBaso = {
                username: '',
                password: 'tukangbaso1',
                facebook: 'urlfacebok'
            }
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBaso)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.an('Array')
                    expect(message).to.include.members(['username is required'])
                    done()
                })
        })

        it('update location', function (done) {
            let updateLocation = {
                latitude: -1.390238,
                longitude: -1.09238023
            }
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .patch('/user')
                .set(headers)
                .send(updateLocation)
                .end(function (err, res) {
                    const updatedData = res.body.updatedData
                    expect(updatedData).to.be.an('Object')
                    expect(updatedData).to.have.property('username')
                    expect(updatedData).to.have.property('password')
                    expect(updatedData).to.have.property('isOwner')
                    expect(updatedData).to.have.property('image')
                    expect(updatedData).to.have.property('latitude')
                    expect(updatedData).to.have.property('longitude')
                    expect(updatedData).to.have.property('history')
                    expect(updatedData).to.have.property('_id')
                    done()
                })
        })

        it('update location authfail', function (done) {
            let updateLocation = {
                latitude: 1,
                longitude: 1
            }
            let headers = {
                token: 'randomtoken'
            }
            chai.request(app)
                .patch('/user')
                .set(headers)
                .send(updateLocation)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('delete tukang baso authfail', function (done) {
            let headers = {
                token: 'randomtoken'
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('delete tukang baso authfail2', function (done) {
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authorization error')
                    done()
                })
        })

        it('delete tukang baso randomid', function (done) {
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('data not found')
                    done()
                })
        })

        it('delete tukang baso success', function (done) {
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .delete(`/user/${tukangBasoIdToDelete}`)
                .set(headers)
                .end(function (err, res) {
                    const deletedUser = res.body.deletedUser
                    expect(deletedUser).to.be.an('Object')
                    expect(deletedUser).to.have.property('_id')
                    expect(deletedUser).to.have.property('isOwner')
                    expect(deletedUser.isOwner).to.be.equals(false)
                    expect(deletedUser._id).to.be.equals(tukangBasoIdToDelete)
                    done()
                })
        })

        it('fetch data user', function (done) {
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .get('/user/')
                .set(headers)
                .end(function (err, res) {
                    const penjualanBakso = res.body
                    expect(penjualanBakso).to.be.an('Array')
                    penjualanBakso.forEach(penjual => {
                        expect(penjual).to.have.property('username')
                        expect(penjual).to.have.property('password')
                        expect(penjual).to.have.property('history')
                        expect(penjual).to.have.property('isOwner')
                        expect(penjual).to.have.property('latitude')
                        expect(penjual).to.have.property('longitude')
                        expect(penjual).to.have.property('image')
                    })
                    done()
                })
        })
    })

    describe('Transaction test', function () {
        it('create transaction test', function (done) {
            let bodyTransaction = {
                latitude: 1,
                longitude: 1
            }
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .post('/transaction/')
                .set(headers)
                .send(bodyTransaction)
                .end(function (err, res) {
                    const message = res.body.message
                    const data = res.body.data
                    expect(message).to.be.an('String')
                    expect(data).to.be.an('Object')
                    expect(data).to.have.property('bowl')
                    expect(data).to.have.property('tukangBaksoId')
                    expect(data).to.have.property('latitude')
                    expect(data).to.have.property('longitude')
                    expect(data).to.have.property('createdAt')
                    expect(data).to.have.property('updatedAt')
                    expect(message).to.be.equals('data added to database')
                    done()
                })
        })

        it('get transaction qty', function (done) {
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .get('/transaction/mangkokQty')
                .set(headers)
                .end(function (err, res) {
                    const data = res.body.data
                    const qty = res.body.qty
                    const message = res.body.message
                    expect(data).to.be.an('Array')
                    data.forEach(transaction => {
                        expect(transaction).to.be.an('Object')
                        expect(transaction).to.have.property('bowl')
                        expect(transaction).to.have.property('tukangBaksoId')
                        expect(transaction).to.have.property('latitude')
                        expect(transaction).to.have.property('longitude')
                        expect(transaction).to.have.property('createdAt')
                        expect(transaction).to.have.property('updatedAt')
                    })
                    expect(qty).to.be.a('Number')
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('fetch success')
                    done()
                })
        })

        it('create transaction fail', function (done) {
            let bodyTransaction = {
                latitude: 1,
                longitude: 1
            }
            let headers = {
                token: 'randomtoken'
            }
            chai.request(app)
                .post('/transaction/')
                .set(headers)
                .send(bodyTransaction)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })



        it('fetch data fail auth', function (done) {
            let headers = {
                token: 'randomtoken'
            }
            chai.request(app)
                .get('/transaction/')
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        // it('fetch data fail auth 2', function (done) {
        //     let headers = {
        //         token: tokenTukangBaso
        //     }
        //     chai.request(app)
        //         .get('/transaction/')
        //         .set(headers)
        //         .end(function (err, res) {
        //             const message = res.body.message
        //             expect(message).to.be.a('String')
        //             expect(message).to.be.equals('authorization error')
        //             done()
        //         })
        // })

        it('fetch transaction', function (done) {
            let headers = {
                token: tokenAdmin
            }
            chai.request(app)
                .get('/transaction')
                .set(headers)
                .end(function (err, res) {
                    const penjualanBakso = res.body.penjualanBakso
                    expect(penjualanBakso).to.be.an('Array')
                    penjualanBakso.forEach(data => {
                        expect(data).to.be.an('Object')
                        expect(data).to.have.property('bowl')
                        expect(data).to.have.property('tukangBaksoId')
                        expect(data).to.have.property('latitude')
                        expect(data).to.have.property('longitude')
                        expect(data).to.have.property('createdAt')
                        expect(data).to.have.property('updatedAt')
                    })
                    done()
                })
        })

    })

    describe('service test', function () {
        it('add service', function (done) {
            let headers = {
                token: tokenTukangBaso
            }
            let bodyToService = {
                problem: 'test',
                longitude: -1.111,
                latitude: -1.111
            }
            chai.request(app)
                .post('/service')
                .set(headers)
                .send(bodyToService)
                .end(function (err, res) {
                    const message = res.body.message
                    const serviceCreated = res.body.serviceCreated
                    expect(message).to.be.a('String')
                    expect(serviceCreated).to.be.an('Object')
                    expect(serviceCreated).to.have.property('problem')
                    expect(serviceCreated).to.have.property('latitude')
                    expect(serviceCreated).to.have.property('longitude')
                    expect(serviceCreated).to.have.property('tukangBasoId')
                    expect(serviceCreated).to.have.property('_id')
                    expect(serviceCreated).to.have.property('createdAt')
                    expect(serviceCreated).to.have.property('updatedAt')
                    idServiceToSolve = serviceCreated._id
                    done()
                })
        })

        it('add service auth fail', function (done) {
            let headers = {
                token: 'randomtoken'
            }
            let bodyToService = {
                problem: 'test',
                longitude: -1.111,
                latitude: -1.111
            }
            chai.request(app)
                .post('/service')
                .set(headers)
                .send(bodyToService)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('update service to solve', function (done) {
            let headers = {
                token: tokenTukangService
            }
            chai.request(app)
                .patch(`/service/${idServiceToSolve}`)
                .set(headers)
                .end(function (err, res) {
                    const data = res.body.data
                    expect(data).to.be.an('Object')
                    expect(data).to.have.property('latitude')
                    expect(data).to.have.property('longitude')
                    expect(data).to.have.property('_id')
                    expect(data).to.have.property('solve')
                    expect(data).to.have.property('problem')
                    expect(data).to.have.property('tukangBasoId')
                    expect(data).to.have.property('createdAt')
                    expect(data).to.have.property('updatedAt')
                    expect(data._id).to.be.equals(idServiceToSolve)
                    done()
                })
        })

        it('update service to solve auth fail', function (done) {
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .patch(`/service/${idServiceToSolve}`)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authorization error')
                    done()
                })
        })


        it('update service to solve auth fail', function (done) {
            let headers = {
                token: 'randomtoken'
            }
            chai.request(app)
                .patch(`/service/${idServiceToSolve}`)
                .set(headers)
                .end(function (err, res) {
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })


        it('service find', function (done) {
            let headers = {
                token: tokenTukangBaso
            }
            chai.request(app)
                .get('/service/')
                .set(headers)
                .end(function (err, res) {
                    const services = res.body.service
                    expect(services).to.be.an('Array')
                    services.forEach(data => {
                        expect(data).to.be.an('Object')
                        expect(data).to.have.property('latitude')
                        expect(data).to.have.property('longitude')
                        expect(data).to.have.property('_id')
                        expect(data).to.have.property('solve')
                        expect(data).to.have.property('problem')
                        expect(data).to.have.property('tukangBasoId')
                        expect(data).to.have.property('createdAt')
                        expect(data).to.have.property('updatedAt')
                    })
                    done()
                })
        })


    })

    describe('fetch rank', function(){

        it('fetch rank', function(done){
            chai.request(app)
                .get('/rank')
                .end(function(err,res){
                    const rank = res.body.rank.rank
                    expect(rank).to.be.an('Array')
                    rank.forEach(item => {
                        expect(item).to.be.an('Object')
                        expect(item).to.have.property('_id')
                        expect(item).to.have.property('username')
                        expect(item).to.have.property('image')
                        expect(item).to.have.property('totalBakso')
                    })
                    done()
                })
        })
    })
})


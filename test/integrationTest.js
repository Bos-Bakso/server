const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const User = require('../model/user')

chai.use(chaiHttp)

describe('TDD', function(){
    let tokenAdmin;
    let tokenTukangBaso;
    let tukangBasoIdToDelete;

    before(function(){
        return User.deleteMany({})
    })

    describe('User test', function(){

        it('admin register', function(done){
            let body = {
                username : 'adminTest01',
                password : 'adminTest01',
            }
            chai.request(app)
                .post('/user/registerAdmin')
                .send(body)
                .end(function(err,res){
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

        it('admin register username already in use', function(done){
            let bodyRegisterFail = {
                username : 'adminTest01',
                password : 'adminTest01',
            }
            chai.request(app)
                .post('/user/registerAdmin')
                .send(bodyRegisterFail)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('username already in use')
                    done()
                })
        })

        it('admin login', function(done){
            let bodyLogin = {
                username : 'adminTest01',
                password : 'adminTest01',
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyLogin)
                .end(function(err,res){
                    const token = res.body.token
                    const isOwner = res.body.isOwner
                    expect(token).to.be.a('String')
                    expect(isOwner).to.be.a('Boolean')
                    expect(isOwner).to.be.equals(true)
                    tokenAdmin = token
                    done()
                })
        })

        it('add tukang baso success', function(done){
            let bodyAddTukangBaso = {
                username : 'tukangBaso1',
                password : 'tukangBaso1'
            }
            let headers = {
                token : tokenAdmin
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBaso)
                .set(headers)
                .end(function(err,res){
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
                    expect(user.isOwner).to.be.equals(false)
                    tukangBasoIdToDelete = user._id
                    done()

                })
        })

        it('login tukang baso success', function(done){
            let bodyTukangBasoLogin = {
                username : 'tukangBaso1',
                password : 'tukangBaso1'
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyTukangBasoLogin)
                .end(function(err,res){
                    const token = res.body.token
                    const isOwner = res.body.isOwner
                    expect(token).to.be.a('String')
                    expect(isOwner).to.be.a('Boolean')
                    expect(isOwner).to.be.equals(false)
                    tokenTukangBaso = token
                    done()
                })
        })

        it('login tukang baso fail', function(done){
            let bodyAddTukangBasoFail3 = {
                username : 'random',
                password : 'random'
            }
            chai.request(app)
                .post('/user/login')
                .send(bodyAddTukangBasoFail3)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('wrong username/password')
                    done()
                })
        })

        it('add tukang baso fail authfail', function(done){
            let bodyAddTukangBasoFail = {
                username : 'tukangBaso1',
                password : 'tukangBaso1'
            }
            let headers = {
                token : 'FAILTOKEN'
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoFail)
                .set(headers)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
            })
        })

        it('add tukang baso fail authfail2', function(done){
            let bodyAddTukangBasoFail2 = {
                username : 'tukangBaso1',
                password : 'tukangBaso1'
            }
            let headers = {
                token : tokenTukangBaso
            }
            chai.request(app)
                .post('/user/add')
                .send(bodyAddTukangBasoFail2)
                .set(headers)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authorization error')
                    done()
            })
        })

        it('update location', function(done){
            let updateLocation = { 
                latitude : 1,
                longitude : 1
            }
            let headers =  {
                token : tokenTukangBaso
            }
            chai.request(app)
                .patch('/user')
                .set(headers)
                .send(updateLocation)
                .end(function(err,res){
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

        it('update location authfail', function(done){
            let updateLocation = { 
                latitude : 1,
                longitude : 1
            }
            let headers =  {
                token : 'randomtoken'
            }
            chai.request(app)
                .patch('/user')
                .set(headers)
                .send(updateLocation)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('delete tukang baso authfail', function(done){
            let headers = {
                token : 'randomtoken'
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authentication error')
                    done()
                })
        })

        it('delete tukang baso authfail2', function(done){
            let headers = {
                token : tokenTukangBaso
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('authorization error')
                    done()
                })
        })

        it('delete tukang baso randomid', function(done){
            let headers = {
                token : tokenAdmin
            }
            chai.request(app)
                .delete(`/user/RANDOMID`)
                .set(headers)
                .end(function(err,res){
                    const message = res.body.message
                    expect(message).to.be.a('String')
                    expect(message).to.be.equals('data not found')
                    done()
                })
        })

        it('delete tukang baso success', function(done){
            let headers = {
                token : tokenAdmin
            }
            chai.request(app)
                .delete(`/user/${tukangBasoIdToDelete}`)
                .set(headers)
                .end(function(err,res){
                    const deletedUser = res.body.deletedUser
                    expect(deletedUser).to.be.an('Object')
                    expect(deletedUser).to.have.property('_id')
                    expect(deletedUser).to.have.property('isOwner')
                    expect(deletedUser.isOwner).to.be.equals(false)
                    expect(deletedUser._id).to.be.equals(tukangBasoIdToDelete)
                    done()
                })
        })
    })
})


const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')
const expect = require('chai').expect
const User = require('../model/user')

chai.use(chaiHttp)

describe('TDD', function(){
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
                    
                    done()
                })
        })

    })
})


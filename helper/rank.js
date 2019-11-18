/* istanbul ignore file */
const Transaction = require('../model/transaction')
const User = require('../model/user')
const rank =() => new Promise(function(res, rej) {
    User.find({ isOwner: false })
    .then(abangs => {
        Transaction.find()
            .then(transactions => {
                const arr = []
                abangs.map(abang => {
                    let person = {
                        _id: abang._id,
                        username : abang.username,
                        image : abang.image,
                        totalBakso : 0
                    }
                    transactions.map(el => {
                        if (el.tukangBaksoId.toString()== person._id.toString()){
                            person.totalBakso = person.totalBakso + 1
                        }}
                        )
                    arr.push(person)
                })
                res({
                    rank:  arr.sort((a, b) => b.totalBakso - a.totalBakso)
                })
            })
            .catch(err => {
                console.log(err);
            })
    })
    .catch(err => {
        console.log(err);
    })
})
module.exports = rank
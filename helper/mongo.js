const mongoose = require('mongoose')
const { seed } = require('../seed')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = function(){
    /* istanbul ignore next */
    if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'){
        mongoose.connect(`mongodb://localhost/initBosBakso_${process.env.NODE_ENV}`, 
            {   useNewUrlParser: true , 
                useUnifiedTopology: true,
                useCreateIndex : true,
                useFindAndModify : false
            }, 
            () => {
                console.log('connected to mongodb LOCAL')
        })

        // mongoose.connect(process.env.MONGOATLAS, 
        //     {   useNewUrlParser: true , 
        //         useUnifiedTopology: true,
        //         useCreateIndex : true,
        //         useFindAndModify : false
        //     }, 
        //     () => {
        //         /* istanbul ignore next */
        //         console.log('connected to mongodb ATLAS')
        //         seed()
        // })

    } else {
        /* istanbul ignore next */
        mongoose.connect(process.env.MONGOATLAS, 
            {   useNewUrlParser: true , 
                useUnifiedTopology: true,
                useCreateIndex : true,
                useFindAndModify : false
            }, 
            () => {
                /* istanbul ignore next */
                console.log('connected to mongodb ATLAS')
        })
    }
}

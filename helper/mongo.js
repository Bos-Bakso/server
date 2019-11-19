const mongoose = require('mongoose')
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

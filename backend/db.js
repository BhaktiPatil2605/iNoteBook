const mongoose = require('mongoose');
const mongouri= 'mongodb://localhost:27017'

const connectToMongo = ()=>{
    // mongoose.connect(mongouri,()=>{
    //     console.log('connect to mongo successfully');
    // })
    mongoose.connect(mongouri).then(
        ()=>console.log("Connected")
    ).catch(
        (e)=>console.log(e.message)
    )
}

module.exports = connectToMongo;
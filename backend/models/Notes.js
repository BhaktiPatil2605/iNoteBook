const mongoose = require('mongoose');

const NotesSchema = new Schema({
    text: {
        type:String,
        require:true
    },
    description: {
        type:String,
        require:true
    },
    tags: {
        type:String,
        default: "General"
    }, 
    Date: {
        type:Date,
        default:Date.now
    },
})

module.exports=mongoose.model('notes',NotesSchema)
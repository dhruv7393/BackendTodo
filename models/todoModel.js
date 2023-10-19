const mongoose = require('mongoose');
 
const ToDosSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    headerId : {
        type:String,
        required: [true, 'Please add headerId']
    },
    title: {
        type:String,
        required: [true, 'Please add a text value']
    },
    imp: {
        type:Number,
        required: [true, 'Please check if imp is not added']
    },
    addedOn:{
        type:String,
        required: [true, 'Please add addedOn']
    },
    done:{
        type:Boolean,
        required: [true, 'Please add wether its done or not']
    }
});
 
module.exports = mongoose.model(
    'ToDos', ToDosSchema, "ToDos");
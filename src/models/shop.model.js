const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'shops'

var shopSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
},{
    timestamps:true,
    collection:COLLECTION_NAME
})

module.exports = mongoose.model(DOCUMENT_NAME,shopSchema);
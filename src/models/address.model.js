const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'Address';
const COLLECTION_NAME = 'address'


var addressSchema = new Schema({
    city:{
        type:String
    },
    coutry:{
        type:String
    },
    street:{
        type:String
    }
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports = mongoose.model(DOCUMENT_NAME,addressSchema);
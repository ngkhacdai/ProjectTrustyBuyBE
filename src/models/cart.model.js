const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'Cart';
const COLLECTION_NAME = 'carts'

var cartSchema = new Schema({
    cart_modifiedOn:{type:Date},
    cart_product:[]
},{
    timestamps:true,
    collection:COLLECTION_NAME
})
module.exports = mongoose.model(DOCUMENT_NAME,cartSchema);

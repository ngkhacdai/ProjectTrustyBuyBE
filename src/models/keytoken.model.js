
const {Schema,model} = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME ='keys'

// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    privateKey:{
        type:String,
        required:true,
    },
    publicKey:{
        type:String,
        required:true,
    },
    refreshTokensUsed:{
        type:Array,
        default:[],
        // những rt đã được sử dụng
    },
    refreshToken:{type:String, required:true}
},{
    collection:COLLECTION_NAME,
    timestamps:true
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);

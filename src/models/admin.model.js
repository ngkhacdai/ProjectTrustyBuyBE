const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'Admin';
const COLLECTION_NAME = 'admins'

var adminSchema = new Schema({
    admin_name:{
        type: String,
        required: true,
        unique: true,
    },
    admin_type:{type:Schema.Types.ObjectId,ref:'AdminType'},
    admin_password:String,
    last_login:{
        type:Date
    }
    
},{
    timestamps:true,
    collection:COLLECTION_NAME
})

var admin_type= new Schema({
    admin_role:{type:String},
    premissions:String

},{
    timestamps:true,
    collection:'admin_types'
})

module.exports ={
    admin:model(DOCUMENT_NAME,adminSchema),
    adminType:model('AdminType',adminSchema)
};
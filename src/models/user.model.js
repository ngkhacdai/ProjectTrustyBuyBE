
const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'users'

var userSchema = new Schema({
    user_name: {
        type: String,
        required: true,
        unique: true,
    },
    user_email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    user_password: {
        type: String,
        required: true,
        unique: true,
    },
    phone_number: {
        type: Number,
        required: true,
        unique: true,
        index: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },
    user_avatar: String,
    user_gender: {
        type: String,
        enum: ['Male', 'Female', 'Unisex'],
    },
    user_address: { type: Schema.Types.ObjectId, ref: 'Address' },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})





module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
const { Schema, default: mongoose } = require('mongoose');
const DOCUMENT_NAME = 'Photo';
const COLLECTION_NAME = 'photos'

var photoSchema = new Schema({
    thumbNail: String,
}, {
    timestamps: true,
    collection: COLLECTION_NAME
})


module.exports = mongoose.model(DOCUMENT_NAME, photoSchema);
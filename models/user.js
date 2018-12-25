const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserModelSchema = new Schema({
    username: {type: String, required: [true, "No username"], unique: true},
    email: {type: String, required: false},
    password: {type: String, required: [true, "No password"]},
    ranking: {type: Number, default: 0},
    picture: {data: Buffer, contentType: String}
})

module.exports = mongoose.model('User',UserModelSchema);

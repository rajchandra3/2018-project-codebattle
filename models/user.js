var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserModelSchema = new Schema({
    username: {type: String, required: [true, "No username"], unique: true},
    email: {type: String, required: false},
    password: {type: String, required: [true, "No password"]},
    ranking: {type: Number, default: 0}
})

module.exports = mongoose.model('Users',UserModelSchema);


const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TaskModelSchema = new Schema({
    title: {type: String, unique: true},
    description: {type: String},
    difficulty: {type: String},
    time: {type: Number, default: 0},
    input: [],
    output: []
})

module.exports = mongoose.model('Task',TaskModelSchema);

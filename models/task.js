const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var TaskModelSchema = new Schema({
    description: {type: String},
    difficulty: {type: String},
    time: {type: Number, default: 0},
    input: [String],
    output: [String]
})

module.exports = mongoose.model('Task',TaskModelSchema);

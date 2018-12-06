const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MatchModelSchema = new Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskID: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    starttime: {type: Date, default: Date.now},
    player1time: {type: Number},
    player2time: {type: Number},
    player1solution: {type: String},
    player2solution: {type: String},
    active: {type: Boolean, default: false}
})

module.exports = mongoose.model('Match',MatchModelSchema);

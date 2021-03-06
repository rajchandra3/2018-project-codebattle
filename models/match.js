const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MatchModelSchema = new Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskID: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    player1starttime: {type: Date, default: null},
    player2starttime: {type: Date, default: null},
    player1time: {type: Number},
    player2time: {type: Number},
    player1solution: {type: String},
    player2solution: {type: String},
    active: {type: Boolean, default: false},
    player1correct: {type: Boolean}, //True if the solution is correct
    player2correct: {type: Boolean},
    winner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null}

})

module.exports = mongoose.model('Match',MatchModelSchema);

const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MatchModelSchema = new Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskID: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    starttime: {type: Date, default: Date.now},
    player1time: {type: Date},
    player2time: {type: Date},
    player1solution: {type: String},
    player2solution: {type: String},
    active: {type: Boolean, default: false},
    player1correct: {type: Boolean}, //True if the solution is correct
    player2correct: {type: Boolean} 
})

module.exports = mongoose.model('Match',MatchModelSchema);

const mongoose = require('mongoose');

var Schema = mongoose.Schema;


var MatchModelSchema = new Schema({
    player1: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    player2: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    taskID: {type: mongoose.Schema.Types.ObjectId, ref: 'Task'},
    time: {type: Number, default: 0}
})

module.exports = mongoose.model('Match',MatchModelSchema);

const Match = require('../models/match');
const Task = require('../models/task');

var inqueue = [];
var match = false;
exports.get = function(req, res){
    if(!inqueue.includes(req.session.user._id)){
        inqueue.push(req.session.user._id);
    }
    if(inqueue.length >= 2 && inqueue[0] == req.session.user._id && match == false){ //If first in queue
        //start game
        match = true;
        res.redirect('/game');
        // Randomize this to get a random task:
        Task.findOne({}, function (err, task){
            if(!task){
              console.log("Could not load any task!!!");
            }
            else{
                // Create a new Match model with player1 and the task  
                var newMatch = new Match({
                    player1: inqueue[0],
                    player2: inqueue[1] ,
                    taskID: task._id,
                    active: true
                });
                newMatch.save(function(err){
                    if(err){
                      console.log(err);
                      return;
                    }
                  });
            }
        }); 
    }
    else if(inqueue.length >=2 && inqueue[1] == req.session.user._id && match == true ){
        var player1 = inqueue.shift(1);
        var player2 = inqueue.shift(1);
        match = false;
        res.redirect('/game');
    }
    else{
        res.render('game/waitingforplayer', {inqueue: inqueue.length})
    }
    



  };

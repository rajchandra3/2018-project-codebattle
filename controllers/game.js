const request = require('request');
const Task = require('../models/task');
const Match = require('../models/match');

exports.get = function(req, res){
  //Check if the user is in a match, if so give the description
  Match.findOne({$or: [{player1: req.session.user._id},{player2: req.session.user._id}]}, function (err, match){ //This should be randomized
    if(!match || match.active == false){
      res.render("/home");
      console.log("Error could not find match for that player");
    }
    else{
      res.render('game/match',{task_description: match.taskID.description});
    }
  }).populate("taskID");
  };

  exports.post = function(req,res){
    const jscode = req.body.code;
    request({
        url: "http://0.0.0.0:4000/receive",
        method: "POST",
        json: true,   // <--Very important!!!
        body: {js_code: jscode}
    }, function (error, response, body){
        res.render('game/codesubmited',{evaluated_code:body});
    });
    
  }  

  
const request = require('request');
const Task = require('../models/task');
const Match = require('../models/match');

exports.get = function(req, res){
  //Check if the user is in a match, if so give the description
  Match.findOne({active: true , $or: [{player1: req.session.user._id},{player2: req.session.user._id}]}, function (err, match){ //This should be randomized
    if(!match || match.active == false){
      res.render("home");
      console.log("Error could not find match for that player");
    }
    else{
      res.render('game/match',{task_description: match.taskID.description});
    }
  }).populate("taskID")
  };

  exports.post = function(req,res){
    var time = Date.now();
    var jscode = req.body.code;
    var correctcode = true; //Used to check if code is runned correctly
    var evaluated =[];
    var input = [];
    var output = [];

    Match.findOne({active: true , $or: [{player1: req.session.user._id},{player2: req.session.user._id}]}, function (err, match){
      input = match.taskID.input;
      output = match.taskID.output;
      
      request({
        url: "http://192.168.99.100:4000/receive", //Local Docker-IP
        method: "POST",
        json: true,
        body: {
          js_code: jscode,
          input: match.taskID.input,
          output: match.taskID.output
        }
      }, function (error, response, body){ // message holds any error messages and ok is true if the code was ok or false if it didn't pass
          console.log(body);
          if(match.player1._id == req.session.user._id){ //If the sess player is player 1
            match.player1solution = jscode; //This probably need some validation
            match.player1time = time;
            match.player1correct = body.ok;

            //Deactivate the game if player 2 has finished
            if(match.player2solution != undefined){
              match.active = false;
            }
          }else{ //The sess player is player 2
            match.player2solution = jscode;
            match.player2time = time;
            match.player2correct = body.ok;

            //Deactivate the game if player 1 has finished
            if(match.player1solution != undefined){
              match.active = false;
            }
          }
          match.save(function(err){
            if(err){
              console.log("There was some problem when saving the players solution in the database.");
            }
            var message = "something went wrong";
            if(body.ok == true && body.message == ""){
              message = "You did good!"
            }
            else if(body.message != ""){
              message = "Your code didn't execute right: " + body.message;
            }
            else if(body.ok == false && body.message == ""){
              message = "You didn't solve the task, better luck next time!";
            }
            res.render('game/codesubmited',{message: message, totaltime: (time - match.starttime)});
          });
        }
      );
      
    }).populate("player1").populate("player2").populate("taskID");
    
  }  

  